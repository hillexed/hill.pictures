
---
title: "oh yeah, I'm making a pifinder"
date: 2023-09-10T01:01:27.835Z
tags: ["electronics","diy","diy electronics","The Cohost Global Feed","astronomy","pifinder","hillescopebuilding"]
---

The sky is too big. I went out telescoping looking for M13 and there were too many stars and it's too big and I don't know where I'm aimed. When you're so zoomed in, there's so many stars you don't know where you are or where to look.

Enter the [pifinder](https://www.pifinder.io/)! I'm going to make one.

I went to my local makerspace, known for having too many donated bits and bobs they actively try to get rid of (what a wonderful problem to have). I found an old project involving a pi, a decade old pi camera v1, and a battery pack that I was allowed to take and cannibalize on the condition that I show off the final product. Thank you!

Pifinders are normally sold for $600 fully assembled because that's what similar units cost, because the astronomy market is nuts. The creator sells cheaper DIY kits, thankfully. I'll be able to save even more DIYing because unlike a normal pifinder, my janky secondhand pifinder will have:

A different battery
No GPS module (those are $50!!!), instead I'll mod the code to input my GPS coordinates from the GPS in my phone
A slightly different IMU chip
A much smaller and older camera, compared to the $50 raspberry pi HD camera twice the size with a convenient screw-on lens interface

Surely none of this will hassle me and I can save money without any consequences!

## Progress so far

First, I needed to buy a lens for my camera!

Looking at what's written on the ribbon cable of the camera, I have a pi camera v1. According to https://www.raspberrypi.com/documentation/accessories/camera.html the sensor is 3.76 × 2.74 mm big, so I can use FoV = 2 * math.atan((2.74/2)/22) * 180/math.pi

Turns out lenses are tricky. The official pifinder uses a 25mm lens. Why? It uses the "tetra3" library by the European Space Agency to go from pictures of stars to figure out where in space you are. You also need to pass in the FoV of the image. Pifinder expects a 10.2 degree FoV, and it has a database that works with FoVs from 10 to 20 degrees. I looked up the formula, and my smaller camera's smaller sensor size would give me a TINY FoV with the same 25mm lens. Oops! I ended up buying a 12mm lens for a 13deg focal length.

Next, getting it on the board. I lost one of two screws holding it on. Following [this video]( https://yewtu.be/watch?v=CcVJpsuHvjQ ), I printed a [M12 lens adapter](https://www.printables.com/model/118467-m12-mount-adapter-for-raspberry-pi-camera-13v-and-), which had screw holes too small but otherwise fit perfectly. However, I also needed to remove the existing lens. There are printed tools for that, but many are a + shape for the pi camera v2, and the pi camera v1's lens is a different shape with 3 spokes. Eventually I found [one](https://www.thingiverse.com/thing:5816480 ), printed it, unscrewed it, finished the job with pliers, and put on the lens. It does seem more zoomed!

Configuring the raspberry pi was a bit annoying. Running "libcamera-vid" shows a video, but for 5 seconds. You need to pass "-t 0" to get the preview to keep running. And after all that... when I turned off the lights, the video was pitch black. I need to figure out how to increase the exposure time if I want it to see stars.

I've spent $30 on electronics and the lens so far. I joined the pifinder discord and the creator was incredibly nice, willing to bundle multiple DIY components if I bought them at once instead of charging double shipping from the webstore price. PCBs and some hardware and LEDs will be arriving soon for another $15. The case is 3D printed, which will cost $little in filament. I have a lot of code work ahead of me to save that money, but it'll be very cool if I can pull this off, with the help of that amazing makerspace.

