#!/usr/bin/perl
use strict;
#-----------------------------------------------------------------------------
# says which tiles contain data from a specified OSM XML file
# usage: tilecount.pl planet.osm > tile_list.txt
#-----------------------------------------------------------------------------
# Copyright 2006, Oliver White
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#-----------------------------------------------------------------------------
use Math::Trig;
# Setup coordinate system
my $LimitY = ProjectF(85.0511);
my $LimitY2 = ProjectF(-85.0511);
my $RangeY = $LimitY - $LimitY2;

my %Tiles;

# precalculate number of tiles in each zoom-level
my @Num;
foreach my $Z(0..18){
  $Num[$Z] = 2 ** $Z;
}
    
# Parse the planet.osm file
open IN, "<",shift() || die("Need an OSM file");
while(my $Line = <IN>){
  if($Line =~ /<node.*lat=\"(.*?)\" lon=\"(.*?)\"/){
    #print "$1, $2\n";
    HandlePos($1,$2);
  }
}
close IN;

# Display the results
foreach my $Key (keys %Tiles){
  print "$Key\n";
}

sub HandlePos(){
  my ($Lat,$Long) = @_;
  # Find position in mercator projection
  my $MercY = ProjectF($Lat);
#  my $RelY = ($MercY - $LimitY2) / $RangeY;
  my $RelY = ( $LimitY - $MercY ) / $RangeY;
  my $RelX = ($Long + 180) / 360;
  
  # Convert to tile coordinates
  foreach my $Z (0..18){
    my $X = int($RelX * $Num[$Z]);
    my $Y = int($RelY * $Num[$Z]);
    my $ID = "$Z:$X:$Y";
    $Tiles{$ID} = 1;
    }
}

sub ProjectF($){
  my $Lat = DegToRad(shift());
  my $Y = log(tan($Lat) + sec($Lat));
  return($Y);
}
sub Project(){
  my ($Y, $Zoom) = @_;
  
  my $Unit = 1 / (2 ** $Zoom);
  my $relY1 = $Y * $Unit;
  my $relY2 = $relY1 + $Unit;
  
  $relY1 = $LimitY - $RangeY * $relY1;
  $relY2 = $LimitY - $RangeY * $relY2;
    
  my $Lat1 = ProjectMercToLat($relY1);
  my $Lat2 = ProjectMercToLat($relY2);
  return(($Lat1, $Lat2));  
}
sub ProjectMercToLat($){
  my $MercY = shift();
  return(RadToDeg(atan(sinh($MercY))));
}
sub ProjectL(){
  my ($X, $Zoom) = @_;
  
  my $Unit = 360 / (2 ** $Zoom);
  my $Long1 = -180 + $X * $Unit;
  return(($Long1, $Long1 + $Unit));  
}
sub DegToRad($){return pi * shift() / 180;}
sub RadToDeg($){return 180 * shift() / pi;}

