#!/usr/bin/perl
#
# analyze_postgis_log.pl [MAPFILE] <postgres.log
#
# MAPFILE ist the name of the Mapnik stylefile, default 'osm.xml'
#
# A script that reads a PostGIS log file AND an osm.xml style file and tries
# to match the select queries from both, delivering indications about which
# layers (at which zoom levels) require the longest execution times.
#
# prerequisites:
# * xmlstarlet installed
# * Postgres log file on stdin, with lines that look like this:
#   2009-11-22 06:30:50 CET osm LOG:  duration: 26266.851 ms  execute <unnamed>: SELECT AsBinary("way",'NDR') AS geom,"disused","name","waterway" from (select way,waterway,disused,name,case when tunnel in ('yes','true','1') then 'yes'::text else tunnel end as tunnel from planet_osm_line where waterway IS NOT NULL order by z_order) as water_lines WHERE "way" && SetSRID('BOX3D(-1.428222656250023 53.31774904749086,-1.032714843749977 53.55336278552809)'::box3d,4326)
#
# You will have to enable duration logging in Postgres, and you may have to change
# the regular expressions in this script if your log looks different.
#
# This script uses the bounding box from the PostGIS query to find out which 
# zoom level was requested. You may have to change the "guessZoomLevel" function
# further down depending on the projection your database is in.

# Written by Frederik Ramm <frederik@remote.org>, PD.

use strict;
#use warnings;

use Math::Trig;

my $input;
my $statement;
my $duration;
my $timings = {};

my $mapfile = shift || 'osm.xml';

while (1)
{
    $input = <>;
    chomp $input;

    if (!defined($input) || $input =~ /^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d (.*)/)
    {
        my $rest = $1;

        if ($rest =~ /^.*LOG:\s+duration: (\d+)(\.\d+)? ms\s*$/)
        {
            # duration given on extra line
            $duration = $1;
        }
        process_statement($statement, $duration) if (defined $statement);
        last unless defined($input);
        undef $statement;
        if ($rest =~ /^.*LOG:\s+(duration: (\d+)(\.\d+)? ms\s+)?execute <[^>]*>: (SELECT .*)/)
        {
            if (defined($1))
            {
                $duration = $2;
            }
            else
            {
                undef $duration;
            }
            $statement = $4;
        }
    }
    else
    {
        $statement .= $input if (defined $statement);
    }
}

my $potential_originating_layers = findStatements();

foreach my $ds(sort { $timings->{$b}->{-1} <=> $timings->{$a}->{-1} } keys %$timings)
{
    print "$ds\n";
    printf "* probable originating layers: ";
    my $comma = "";
    foreach my $pol(@{$potential_originating_layers->{$ds}})
    {
        print $comma.$pol->{layer};
        $comma = ", ";
    }
    print "none found" if ($comma eq "");
    print "\n";
    print "  zoom  count  min time  avg time  max time\n";
    print "  -----------------------------------------\n";
    foreach my $z (sort { $a <=> $b } keys %{$timings->{$ds}})
    {
        next unless $z >= 0;

        my $t = $timings->{$ds}->{$z};

        my $count =  $t->{count};
        my $min   = ($t->{min}//0)           / 1000;
        my $avg   =  $t->{sum} / $t->{count} / 1000;
        my $max   =  $t->{max}               / 1000;

        my $warn = '';
        $warn = '***'   if ($count >  10 && ($min >  10 || $avg >  20 || $max >  30));
        $warn = '*****' if (                ($min >  60 || $avg >  80 || $max > 100));

        printf "    %2d %6d %8.1fs %8.1fs %8.1fs $warn\n", $z, $count, $min, $avg, $max;
    }
    printf "\n";
}

sub process_statement
{
    my ($stmt, $dur) = @_;
    $stmt =~ s/\s+/ /g;
    if ($stmt =~ /SELECT.*from (\(.*\) as \S+) WHERE \S+ && SetSRID\('BOX3D\((\S+) (\S+),(\S+) (\S+)\)'::box3d,\s*(4326|900913)\)/)
    {
        my ($datasource, $left, $bottom, $right, $top, $proj) = ($1, $2, $3, $4, $5, $6);
        my $zoom = guessZoomLevel($left, $bottom, $right, $top, $proj);
        $timings->{$datasource}->{$zoom}->{count} ++;
        $timings->{$datasource}->{$zoom}->{sum} += $dur;
        $timings->{$datasource}->{$zoom}->{min} = $dur if ($dur < ($timings->{$datasource}->{$zoom}->{min} // 999_999_999_999_999));
        $timings->{$datasource}->{$zoom}->{max} = $dur if ($dur > ($timings->{$datasource}->{$zoom}->{max} // 0));
        # the following line determines the sorting of the final results. 
        # currently the queries that use the longest total time are at the 
        # top but you could also do a "max" calculation here or simply count
        # the invocations.
        $timings->{$datasource}->{-1} += $dur;
    }
    else
    {
        print STDERR "cannot understand $stmt\n";
    }
}

# Guesses the zoom level that was rendered by renderd, based on the bounding box
# in the PostGIS query. Basically we're looking for a zoom level in which the 
# requested bbox would be just slightly wider than 8 tiles (=1 meta tile).
# This code is for PostGIS databases in lat/lon (osm2pgsql -l) and will have to
# be changed to work with spherical mercator coordinates.

sub guessZoomLevel
{
    my ($left, $bottom, $right, $top, $proj) = @_;
    if ($proj == 4326)
    {
        my ($left_tile, $bottom_tile) = getTileNumber($bottom, $left, 18);
        my ($right_tile, $top_tile) = getTileNumber($top, $right, 18);
        my $width = $right_tile - $left_tile;
        my $zoom = 18;
        while ($width >= 16)
        {
            $width /= 2;
            $zoom--;
        }
        return $zoom;
    } elsif ($proj == 900913)
    {
        return 99;
    }
}

sub getTileNumber
{
    my ($lat,$lon,$zoom) = @_;
    my $xtile = int(($lon+180)/360 *2**$zoom);
    my $ytile = int((1 - log(tan($lat*pi/180) + sec($lat*pi/180))/pi)/2 *2**$zoom);
    return(($xtile, $ytile));
}

# parses the style file to find out which layers use which statements
sub findStatements
{
    my $result;

    # Using xmlstarlet resolves all entities for us...
    open(STYLE, "xmlstarlet c14n $mapfile|") or die;

    my $styles = {};
    my $currentlayername;
    my $where;

    while(<STYLE>)
    {
        chomp;
        if (/<Style name="(.*)"/)
        {
            $styles->{$1} = { name => $1 };
        }
        elsif (/<Layer\s.*name="([^"]+)"/)
        {
            $currentlayername = $1;
            undef $where;
        }
        elsif (/<StyleName>(.*)</)
        {
            my $style = $styles->{$1};
            if (!defined($style))
            {
                die "layer '$currentlayername' references undefined style '$1'";
            }
        }
        elsif (/<Parameter name="table">(.*)/)
        {
            my $table = $1;
            while($table !~ /<\/Parameter>/)
            {
                $_ = <STYLE>;
                chomp;
                $table .= $_;
            }
            if ($table !~ /^\s*(\(.*\)\s+as\s+\S+)\s*<\/Parameter>$/i)
            {
                die "parse error: $table";
            }
            $table = $1;
            $table =~ s/\s+/ /g;
            $table =~ /(\(select (.*) from (.*) where (.*)\) as \S+)/ or die $table;
            $where = $1;
        }
        elsif (/<\/Layer>/)
        {
            if (defined($where))
            {
                push(@{$result->{$where}}, { layer => $currentlayername })
            }
        }
    }
    return $result;
}

