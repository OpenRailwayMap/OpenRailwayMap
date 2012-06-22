#!/usr/bin/perl

# A small (& dirty) script that creates a table giving you an estimate of 
# which SQL queries will be executed at which scale denominators, by 
# aggregating the min/max scale denominators for all rules and styles and 
# matching them up with layers.

# it reads the osm.xml file in the current directory and requires that
# xmlstarlet be installed.

# Example result (needs wide window):

# Layer                    |MinZ|MaxZ| Table              | WHERE clause
# world                    |  9 |  0 |                    | 
# placenames-large         | 14 |  2 | planet_osm_point   | place in ('country','state') or (place in ('city','metropolis') and capital='yes') 
# admin-01234              | 10 |  2 | planet_osm_roads   | "boundary"='administrative' and admin_level in ('0','1','2','3','4') 
# roads                    | 18 |  5 | planet_osm_roads   | highway is not null or railway is not null order by z_order 
# water_areas              |  7 |  6 | planet_osm_polygon | waterway in ('dock','mill_pond','riverbank','canal') or landuse in ('reservoir','water','basin') or "natural" in ('lake','water','land','marsh','scrub','wetland','glacier') order by z_order,way_area desc 
# ...

# This can be used to improve efficiency. For example in the above table, 
# the "roads" layer comes in at the early scale zoom level of 5,
# and selects a large amount of objects which may be undesirable.

# Written by Frederik Ramm <frederik@remote.org>, PD.


my $msdmapping = {};
open(ENT, "inc/entities.xml.inc") or die;
while(<ENT>)
{
    if (/<!ENTITY (m..scale_zoom\d+) "(<M..ScaleDenominator>\d+<\/M..ScaleDenominator>)"/)
    {
        $msdmapping->{$2} = $1;
    }
}
close(ENT);

# Using xmlstarlet resolves all entities for us...
open(STYLE, "xmlstarlet c14n osm.xml|") or die "cannot run xmlstarlet and/or cannot find osm.xml in current directory";

my $styles = {};

while(<STYLE>)
{
    chomp;
    if (/<Style name="(.*)"/)
    {
        $styles->{$1} = { name => $1 };
        $currentstyle = $styles->{$1};
    }
    elsif (/(<M..ScaleDenominator>\d+<\/M..ScaleDenominator>)/)
    {
        my $msd = $msdmapping->{$1};
        die "cannot reverse-map entity for $1" if (!defined $msd);
        if ($msd =~ /maxscale_zoom(\d+)/)
        {
            $currentstyle->{maxzoom} = $1 if ($currentstyle->{maxzoom} > $1 or !defined($currentstyle->{maxzoom}));
        }
        elsif ($msd =~ /minscale_zoom(\d+)/)
        {
            $currentstyle->{minzoom} = $1 if ($currentstyle->{minzoom} < $1);
        }
        else
        {
            die "cannot process '$msd'";
        }
    }
    elsif (/<Layer\s.*name="([^"]+)"/)
    {
        $currentlayername = $1;
        undef $minzoom;
        undef $maxzoom;
        undef $sel;
        undef $from;
        undef $where;
    }
    elsif (/<StyleName>(.*)</)
    {
        my $style = $styles->{$1};
        if (!defined($style))
        {
            die "layer '$currentlayername' references undefined style '$1'";
        }
        $maxzoom = $style->{maxzoom} if ($maxzoom > $style->{maxzoom} or !defined($maxzoom));
        $minzoom = $style->{minzoom} if ($minzoom < $style->{minzoom});
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
        if ($table !~ /^\s*\((.*)\)\s+as\s+\S+\s*<\/Parameter>$/i)
        {
            die "parse error: $table";
        }
        $table = $1;
        $table =~ s/\s+/ /g;
        $table =~ /select (.*) from (.*)( where (.*))/ or die;
        ($sel, $from, $where) = ($1, $2, $4);
    }
    elsif (/<\/Layer>/)
    {
        push (@results, { maxzoom => $maxzoom, detail =>
            sprintf "%-24s | %2d | %2d | %-18s | %s\n",
            $currentlayername, $minzoom, $maxzoom, $from, $where });
    }
}

printf "%-24s |MinZ|MaxZ| %-18s | %s\n",
    "Layer", "Table", "WHERE clause";

foreach my $layer (sort { $a->{maxzoom} <=> $b->{maxzoom} } @results)
{
    print $layer->{detail};
}

