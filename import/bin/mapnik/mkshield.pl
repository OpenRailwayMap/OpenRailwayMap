#!/usr/bin/perl

use strict;
use warnings;

use GD;

mkshield("motorway_shield1", 17, 17, 128, 155, 192);
mkshield("motorway_shield2", 24, 17, 128, 155, 192);
mkshield("motorway_shield3", 31, 17, 128, 155, 192);
mkshield("motorway_shield4", 38, 17, 128, 155, 192);
mkshield("motorway_shield5", 45, 17, 128, 155, 192);
mkshield("motorway_shield6", 52, 17, 128, 155, 192);

mkshield("trunk_shield1", 17, 17, 127, 201, 127);
mkshield("trunk_shield2", 24, 17, 127, 201, 127);
mkshield("trunk_shield3", 31, 17, 127, 201, 127);
mkshield("trunk_shield4", 38, 17, 127, 201, 127);
mkshield("trunk_shield5", 45, 17, 127, 201, 127);
mkshield("trunk_shield6", 52, 17, 127, 201, 127);
mkshield("trunk_shield7", 59, 17, 127, 201, 127);
mkshield("trunk_shield8", 66, 17, 127, 201, 127);

mkshield("primary_shield1", 17, 17, 228, 109, 113);
mkshield("primary_shield2", 24, 17, 228, 109, 113);
mkshield("primary_shield3", 31, 17, 228, 109, 113);
mkshield("primary_shield4", 38, 17, 228, 109, 113);
mkshield("primary_shield5", 45, 17, 228, 109, 113);
mkshield("primary_shield6", 52, 17, 228, 109, 113);
mkshield("primary_shield7", 59, 17, 228, 109, 113);
mkshield("primary_shield8", 66, 17, 228, 109, 113);

mkshield("secondary_shield1", 17, 17, 253, 191, 111);
mkshield("secondary_shield2", 24, 17, 253, 191, 111);
mkshield("secondary_shield3", 31, 17, 253, 191, 111);
mkshield("secondary_shield4", 38, 17, 253, 191, 111);
mkshield("secondary_shield5", 45, 17, 253, 191, 111);
mkshield("secondary_shield6", 52, 17, 253, 191, 111);
mkshield("secondary_shield7", 59, 17, 253, 191, 111);
mkshield("secondary_shield8", 66, 17, 253, 191, 111);

mkshield("tertiary_shield1", 17, 17, 153, 153, 153);
mkshield("tertiary_shield2", 24, 17, 153, 153, 153);
mkshield("tertiary_shield3", 31, 17, 153, 153, 153);
mkshield("tertiary_shield4", 38, 17, 153, 153, 153);
mkshield("tertiary_shield5", 45, 17, 153, 153, 153);
mkshield("tertiary_shield6", 52, 17, 153, 153, 153);
mkshield("tertiary_shield7", 59, 17, 153, 153, 153);
mkshield("tertiary_shield8", 66, 17, 153, 153, 153);

exit 0;

sub mkshield
{
    my $name = shift;
    my $width = shift;
    my $height = shift;
    my $r = shift;
    my $g = shift;
    my $b = shift;

    my $shield = GD::Image->new($width, $height, 1);

    $shield->alphaBlending(0);
    $shield->saveAlpha(1);

    my $white = $shield->colorAllocate(255, 255, 255);
    my $border1 = $shield->colorAllocate($r, $g, $b);
    my $border2 = $shield->colorAllocateAlpha(round($r * 1.2578), round($g * 1.1677), round($b * 1.0833), 8);
    my $border3 = $shield->colorAllocateAlpha(round($r * 1.2031), round($g * 1.1290), round($b * 1.0677), 21);
    my $border4 = $shield->colorAllocateAlpha($r, $g, $b, 43);
    my $border5 = $shield->colorAllocateAlpha(round($r * 1.0391), round($g * 1.0258), round($b * 1.0104), 8);

    $shield->filledRectangle(2, 2, $width - 3, $height - 3, $white);

    $shield->line(0, 1, 0, $height - 2, $border1);
    $shield->line($width - 1, 1, $width - 1, $height - 2, $border1);
    $shield->line(1, 0, $width - 2, 0, $border1);
    $shield->line(1, $height - 1, $width - 2, $height - 1, $border1);

    $shield->line(1, 2, 1, $height - 3, $border2);
    $shield->line($width - 2, 2, $width - 2, $height - 3, $border2);

    $shield->line(2, 1, $width - 3, 1, $border3);
    $shield->line(2, $height - 2, $width - 3, $height - 2, $border3);

    $shield->setPixel(0, 0, $border4);
    $shield->setPixel(0, $height - 1, $border4);
    $shield->setPixel($width - 1, $height - 1, $border4);
    $shield->setPixel($width - 1, 0, $border4);

    $shield->setPixel(1, 1, $border5);
    $shield->setPixel(1, $height - 2, $border5);
    $shield->setPixel($width - 2, $height - 2, $border5);
    $shield->setPixel($width - 2, 1, $border5);

    open(SHIELD, "> ${name}.png") || die "Can't open ${name}.png: $!";
    binmode(SHIELD);
    print SHIELD $shield->png;
    close(SHIELD);

    return;
}

sub round
{
    my $n = shift;
    my $r = sprintf("%.0f", $n);

    $r = 255 if $r > 255;

    return $r;
}
