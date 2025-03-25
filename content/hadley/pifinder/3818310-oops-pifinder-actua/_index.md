
---
title: "Oops, pifinder actually wasn't done"
date: 2023-12-10T17:07:33.573Z
tags: ["pifinder","electronics","diy electronics","astronomy","hillescopebuilding"]
---
{{< gallery >}}
{{< figure alt="" src="IMG_20231209_212513995_HDR.jpg" >}}
{{< /gallery >}}

Oops. NOW my Sliced PiFinder is done.

The original PiFinder uses a $50 USB GPS module. To avoid spending $50, I wrote some code to fake a GPS. Eventually the dev brickbots switched PiFinders to a $10 solderable GPS module that uses UART instead of USB, and $10 felt reasonable, so I bought one and soldered it in. I thought I was done and that all I had to do was edit the software to remove my fake GPS code and use the regular GPS code! I was wrong - the GPS didn't connect.

My Sliced PiFinder uses a raspberry pi 3 but the PiFinder was designed for a raspberry pi 4. I thought the only difference was CPU speed, but there's more: the instructions asked me to solder the GPS to two pins which couldn't speak UART on a pi 3 but could on a pi 4. Oops.

The Pi 3 has only one pair of GPIO pins that can speak UART: 14 and 15. By default it's used for a "linux serial console", but you can configure it for custom use (like listening to GPS) by adding `enable_uart=1` in /boot/config.txt.

So I desoldered my GPS, attached it to pins 14 and 15 with some truly janky soldering (pic above), fixed a "NMEA unknown msg" problem by [turning off echo according to comments here](https://portal.u-blox.com/s/question/0D52p00008HKCImCAP/gptxt-nmea-unknown-msg-meaning), edited gpsd.conf, and now GPS is finally working.


<div style="border: 1px solid black; background-color: #237; color: #fff; padding: 1em; font-family: serif; border-radius: 3em; margin: auto 0; text-align:center">PIFINDER: COMPLETE!<br><span style="font-size:50%;padding:0">...for real this time</span></div>

