---
title: Aiming
tags: ["hadley"]
---

My Hadley has two upgrades that help it aim.

## Finderscope

The first upgrade is an 6x50 finderscope that says "orion" on it. I found it in my local astronomy club's shelf of spare parts, bought it for $10, and designed a 3D printed adapter for it to fit onto my Hadley. It features integrated crosshairs and helps me aim at planets at a glance!


{{< gallery >}}
{{< figure alt="A finderscope on the side of my telescope" src="finderscope.jpg" >}} 
{{< /gallery >}}


## Sliced Pifinder

The second upgrade is the Sliced PiFinder. It's a targeting computer that permanently lives on my telescope - which is an incredible sentence. We truly live in the future.

{{< gallery >}}
{{< figure alt="The camera and raspberry pi and cramped interior circuit board of the pifinder" src="pifinder/3810526-pifinder-complete/IMG_20231208_190024848.jpg" >}}
{{< figure alt="The PiFinder's 3D printed case, which wasn't designed for my scavenged battery pack and has clearly been melted with a soldering iron to expose important parts." src="pifinder/3810526-pifinder-complete/IMG_20231209_145050722_1.jpg" >}}
{{< figure alt="The PiFinder mounted on my 3D printed telescope!" src="pifinder/3810526-pifinder-complete/IMG_20231208_204635840_1.jpg" >}}
{{< /gallery >}}

The PiFinder is a device that uses a raspberry pi and a camera to take pictures of the sky and compute where in the sky your telescope is aiming, even with high light pollution. Since it knows where the telescope points, you can select a particular galaxy or nebula and it will tell you how to push the telescope to get there. 

PiFinders are an open-source project that can also be bought for $500 from the designer. Mine was built for $110 - a mere slice of the cost. The stock PiFinder is designed for a Raspberry Pi 4 using the Raspberry Pi High Quality Camera ($50) with a $50 lens, but I 3D printed and assembled the parts myself, used a scavenged battery pack and previous-generation Raspberry Pi 3 from a defunct project, and a $30 IMX462 camera and $12 lens. 

