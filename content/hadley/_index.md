---
title: "My First Telescope: the Hadley"
---

{{< img src="PART_1693457620331_IMG_3090.jpg" alt="The Hadley telescope!">}}

This little 3D printed telescope kickstarted my journey into astronomy. The design is [free and open source](https://www.printables.com/model/224383-astronomical-telescope-hadley-an-easy-assembly-hig), and uses 3D printed parts, aluminum tubes, and hardware store nuts and bolts. 

It sits on the [Hill Mount](https://www.printables.com/model/565412-hill-mount-for-hadley-telescope), a portable and cheap altitude mount I designed that costs around $20. It's lightweight enough I have walked two miles to a subway stop while carrying it the whole time.

Azimuth is controlled by physically sliding the plastic across the ground. Sure, I could put it on a turntable, but that would make it heavier.

It has a number of upgrades - including an integrated finderscope and a high-tech computerized aiming system I printed and hand-soldered myself.

## Finderscope

The first upgrade is an 6x50 finderscope that says "orion" on it. I found it in my local astronomy club's shelf of spare parts and designed a 3D printed adapter for it to fit onto the telescope. It features integrated crosshairs and helps me line up planets at a glance!

{{< gallery >}}
{{< figure alt="A finderscope on the side of my telescope" src="finderscope.jpg" >}} 
{{< /gallery >}}

## Sliced Pifinder

The second upgrade is the Sliced PiFinder. It's a targeting computer that permanently lives on my telescope - which is an incredible sentence. We truly live in the future.

{{< gallery >}}
{{< figure alt="The camera and raspberry pi and cramped interior circuit board of the pifinder" src="IMG_20231208_190024848.jpg" >}}
{{< figure alt="The PiFinder's 3D printed case, which wasn't designed for my scavenged battery pack and has clearly been melted with a soldering iron to expose important parts." src="IMG_20231209_145050722_1.jpg" >}}
{{< figure alt="The PiFinder mounted on my 3D printed telescope!" src="IMG_20231208_204635840_1.jpg" >}}
{{< /gallery >}}

The PiFinder is a device that uses a raspberry pi and a camera to take pictures of the sky and compute where in the sky your telescope is aiming, even with high light pollution. Since it knows where the telescope points, you can select a particular galaxy or nebula and it will tell you how to push the telescope to get there. 

PiFinders are an open-source project that can also be bought for $500 from the designer. Mine was built for $110 - a mere slice of the cost. The stock PiFinder is designed for a Raspberry Pi 4 using the Raspberry Pi High Quality Camera ($50) with a $50 lens, but I 3D printed and assembled the parts myself, used a scavenged battery pack and previous-generation Raspberry Pi 3 from a defunct project, and a $30 IMX462 camera and $12 lens. 

## Taking photos on a budget

I like to think of myself as on the cutting edge of cell phone astrophotography. I use a 3D printed clamp to hold my phone up to the eyepiece and take photos using my phone camera. However, tapping the phone button causes vibrations that wobble the telsecope. To fix that, I use a raspberry pi pico microcontroller as a wireless remote shutter. I programmed it to act as a bluetooth mouse and connect to my phone. When I press the built-in button, it moves the mouse to the center of the screen and clicks the "take picture" button. To see pictures this setup has taken, take a look at my [Astrophotos](/astrophotos) page!
