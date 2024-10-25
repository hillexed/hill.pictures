---
title: Fixing the Astigmatism
---

When I tried to focus my Hadley on mars, I couldn't see very much. It looked like a blob.

When I looked at Saturn, I noticed a sort of double-saturn effect.
<image goes here>

The Hadley's default telescope mount was very wobbly. I assumed that the pattern I was seeing of two saturn images was actually one Saturn image vibrating back and forth quickly. 

Based on this assumption, I designed a much stiffer truss mount. Inspired by Ivan's open-source Hadley mount which used a truss design but sized for metric screws and rods, I designed a printable Hadley mount focused on a truss design to reduce wobbling and cheap EMT steel tubing. While the Hadley used aluminum rods that cost $30 for 9 feet, one 10-foot tube of EMT cost $7! Eventually I open-sourced my design; it's available to download for anyone who has a Hadley!

After spending a long time building my design... Every star still looked like two points close together when viewed through the Hadley.

Undeterred, I redesigned the mount to be even stiffer; going through three iterations of increasingly stiffer mounts and even adding cross-bracing.

I took a look... still double saturn.

It took looking at the double-double in Lyra to figure out the issue. I should have seen two clusters of two stars. I did see two clusters of two stars - but each cluster seemed to be aligned the same direction. That direction didn't match the star charts - and it didn't even match the direction that my telescope should have been wobbling in. My "extremely fast vibrating" wasn't vibration at all. 

The problem? Astigmatism in my primary mirror. The Hadley telescope relies on a $30 cheap chinese mirror, and not all mirrors are made equal. I had bought a mirror off a random vendor from Amazon, and instead of a perfectly spherical shape, my mirror focused light to two slightly different places. As confirmation, removing the lower optical assembly containing the mirror and putting it back on rotated 120 degrees rotated the abberations.

Eventually I reported my findings to the Hadley discord, and Zane Landers offered to ship me a replacement 4.5" mirror. Saturn has looked sharp ever since.
