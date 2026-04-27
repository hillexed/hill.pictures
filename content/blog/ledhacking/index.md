---
title: "Hacking an LED strip"
date: 2026-04-24
tags: ["electronics","diy electronics"]
---

{{< gallery >}}
{{< figure alt="The LED strip." src="IMG_20260308_230318226_HDR.jpg" >}}
{{< figure alt="Attempting to reprogram it. A pesky fuse prevented me from entering boot mode." src="IMG_20260411_204224538_HDR.jpg" >}}
{{< figure alt="Removing the ESP32" src="IMG_20260411_214023934_HDR.jpg" >}}
{{< figure alt="Replacing it with my own microcontroller!" src="IMG_20260411_223856311_HDR.jpg" >}}
{{< figure alt="Modifying the enclosure to fit the new microcontroller. In retrospect, an x-acto knife was the wrong tool for the job here. " src="IMG_20260411_233827076_HDR.jpg" >}}
{{< figure alt="It fits!" src="IMG_20260411_234234459_HDR.jpg" >}}
{{< figure alt="Well, it mostly fits!" src="IMG_20260411_234259537_HDR.jpg" >}}
{{< /gallery >}}

One day in the computer store I saw a 25 foot addressable LED strip on sale for $17. Less than $1/foot seemed like a good deal, I thought, and perhaps I could remove the LEDs and control them myself via an ESP32 microcontroller.

The model is the MLW7-1025-ICM smart LED strip. Interestingly, it isn't visible on the manufacturer's [website](https://monsterilluminessence.com/) but can still be found on Amazon or Walmart. Each addressable LED controls 3 physical LEDs that share the same color.

I took it home and unboxed it. Turns out they were one step ahead of me - the manufacturer _already_ put an ESP32 in there. Specifically, they use a CDW6986850-00 module, which contains an ESP8266, a cheaper variant of the ESP32C3. 

Could I reprogram it? I grabbed an FTDI cable and made the appropriate connections. I was able to obtain serial output! Unfortunately, the microcontroller refused to enter download boot mode upon being reset. Normally the ESP32 requires certain GPIO pins to be high or low to enter a boot mode where it will accept new programming. [The various bits of the boot state encode the state of those pins](https://docs.espressif.com/projects/esptool/en/latest/esp32c3/advanced-topics/boot-mode-selection.html), which helped me determine where on the CDK module the pins connected. (Lesson learned: the ESP32C3 has different strapping pins than the bare ESP32!)

Eventually I configured the pins properly, and yet the CDK module refused to boot. I believe this is because the manufacturers internally burned a fuse preventing the module from ever entering boot mode. Very rude.

Instead, I desoldered their ESP32 and replaced it with my own. The circuit board is very simple; most of it is simply regulating 9V power to 3V. It only uses two GPIO pins; one for the button on the back of the switch, and one output for the LEDs. 

The most common RGB LED protocol is WS2811. Could this LED strip be using WS2811? I programmed my xiao with a simple WS2811 example code without thinking too hard; it worked on the first try.

### Home Assistant

The dream would be to be able to control the LEDs from my phone. To do that, I installed ESPHome onto the ESP32. With a different device running a Home Assistant server, I gain the ability to program color changes at different times of day, including the ability to flash red at bedtime. ESPHome also impressed me with over-the-air firmware update capability.

Years ago, a friend upgraded his phone and donated me the old one. Could I use it as a Home Assistant hub? At first I thought I would need to install a custom OS, but I was unable to root the phone. This means I could not get mDNS to work. Thankfully, I am not the first person to try running Home Assistant on Termux. When I tried [the HomeAssistant-Termux](https://github.com/huytungst/HomeAssistant-Termux) repo, the instructions there didn't quite work - I got a `no image found in manifest for platform android/arm64 home assistant` error. What did work was [Termux-UDocker](https://github.com/George-Seven/Termux-Udocker).

### The results

I can now use my phone to control the color of my lights, zero cloud servers required. What a fun feeling. At sunset, the lights turn on. At midnight, if the lights are still on, they flash a warning to head to bed. Fun!
