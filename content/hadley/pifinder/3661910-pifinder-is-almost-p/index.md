
---
title: "Pifinder is almost pifinding!"
date: 2023-11-26T01:17:31.823Z
tags: ["astronomy","3d printing","hillescopebuilding","pifinder","electronics"]
---
{{< gallery >}}
{{< figure alt="The first and second versions of my IMX462 camera holder, along with screws and nuts" src="image.png" >}}
{{< figure alt="The second version of my camera holder, all assembled! A protective blue 3D printed case fits around a green circuit board with a tiny black cylinder of a camera sticking up from it!" src="image.png" >}}
{{< figure alt="The pifinder's lights glow red, while the display shows that the camera sees some stars!" src="image.png" >}}
{{< figure alt="My best guess for which region of the sky the pifinder is looking at. Compare the stars to what's displayed on the pifinder's screen!" src="image.png" >}}
{{< /gallery >}}

The pifinder is a tool to help you aim a telescope. It uses a camera to take pictures of the sky, connected to a raspberry pi which uses a database of stars to tell you where in the sky your telescope is pointing. Then, if you want to find a specific object, it tells you what direction to move your telescope in. 

I'm building a janky pifinder with some nonstandard parts: instead of a $60 raspi 4 and $50 HQ camera and $25 lens and $30 IMU, I'm using a $10 lens, a secondhand raspi 3, and a cheap "pi camera module v1" from 2013 that was attached to the raspi, and a $20 [IMU with unpronounceable name](https://www.adafruit.com/product/4517) I found lying around in a drawer of sensors. Previously, [it didn't see any stars](https://cohost.org/hillexed/post/3548069-i-built-enough-of-a), so [I bought a better camera, an IMX462](https://cohost.org/hillexed/post/3638072-maybe-this-camera-wi).

Turns out the two cameras are different sizes, so the enclosure for my first camera didn't fit the second one. The IMX462 has some holes in it that fit M2 screws, but my local hardware store only sells metric screws in specific lengths like 12mm, while the pifinder wants 8mm screws.

So I designed a 3D printed enclosure for the new camera, and printed it in orange! It was too big; the screws I bought weren't long enough. 

So I designed another 3D printed enclosure for the new camera, and printed it in blue! It did fit!

Then I put it together, and took it outside... and the display showed that the camera is successfully seeing stars! This camera is definitely much better and more sensitive than the old one. Plus, because it's connected to a raspberry pi, I can just SSH in and ask it to take pictures to see the raw camera output. 

The pifinder still isn't plate solving properly - it should be trying to compute where in the sky it's looking and it isn't. It could be the lens/camera combo means this image is a different FoV than it expects, meaning it's seeing more or less of the sky and the stars are closer or farther apart than it expects. We'll see.

