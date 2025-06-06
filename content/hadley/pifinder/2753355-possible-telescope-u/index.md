
---
title: "Possible telescope upgrades"
date: 2023-09-06T20:39:46.115Z
tags: ["astronomy","The Cohost Global Feed","hillescopebuilding","pifinder"]
---

My telescope is pretty good, but now that I have one I've been thinking about how to get even better. Here's what I've been thinking about:

#1: Bigger telescope. 

Bigger telescopes with bigger mirrors both capture more light and allow you to resolve tinier details. I saw someone made a "Leavitt" telescope, also 3D printed, designed to fit an 8" mirror! My telescope has a 4.5" mirror right now. It cost $30. <details><summary>An 8" mirror, double the diameter, costs...</summary>$360. Oof.</details>

Another way to do it is to grind the mirror yourself. There's a long tradition of amateur telescope makers doing that, but it takes lots of time grinding and polishing. The raw materials are still expensive-ish - an 8" circle of glass 1" thick is around $55, and there's $50 extra of grits and powders you need. For making ultra-big mirrors, there's some insane people who have started using kilns to take glass circles of normal plate glass and soften them over a mold, so they fall down and make a meniscus shape. It's a rabbit hole I've already gone very very far down researching.

#2: Motorize the mount. 

Stepper motors are decently cheap. With some gearboxes to reduce their speed, you could give your telescope the ability to automatically point itself at a target.

There are two kinds of mounts: Alt/Az and Equatorial. Alt/az involve one axis which rotates left/right along the ground, changing "azimuth", and one axis which rotates up/down to change "altitude", like a cannon. They're the simplest to design, and someone has already made one for my Hadley telescope! But I'd need wood-cutting tools and $100 or so for just the wood alone, not to mention electronics.

Equatorial mounts are angled so one axis points towards the north pole, and rotates along the same axis that planet earth does to counteract the rotation of the planets. These are the ideal kind of mount. They're much harder to design because they have to carry all the weight on those axes and geraboxes, and earth's spin axis isn't at all aligned with gravity.

Once you've set up motors, you can add "goto" functionality, which lets you press a button and watch as the telescope automatically figures out how to point at something. There's software called "onstep" for that. I'd love goto someday!

Either type of motorized mount would also let me start taking long exposures to photograph very dim things out in space. An alt/az mount would let me take long exposures of up to a minute. Expose for too long with an alt/az mount and you'll notice the thing you're staring at starts rotating in your field of view, called "field rotation". An equatorial mount doesn't have that problem, but they're expensive: a commercial entry-level one is around $700.

Surprisingly, there are people 3D printing decent equatorial mounts! Not many, though - it's hard to design gearboxes without "backlash" to avoid tiny wobbles. Most are designed to hold DSLR cameras, not heavier telescopes.

#3: Pi-finder

https://www.pifinder.io/ is a neat raspberry pi powered device that looks at the sky and tells you where you're pointed. It uses a high quality camera to take pictures of the sky, does some magic to figure out where you are, and then uses an accelerometer to track slight nudges. You still need to point and aim the telescope, but it would let me know where I'm aiming.

The most expensive components are a $50 high quality raspberry pi camera, a $20 lens, a $50 GPS USB stick, and an out-of-stock-everywhere raspberry pi 4. Ouch. But I do have a pi 1 lying around... maybe it'll work? Plus, if I mod the software so I can input my coordinates from the GPS I carry around in my phone, I can save $100 or so.

Will I do any of these? I don't know!

