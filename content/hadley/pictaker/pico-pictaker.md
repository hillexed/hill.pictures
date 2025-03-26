---
title: "A rabbit hole of bluetooth"
date: 2023-08-04T02:25:25.634Z
tags: ["The Cohost Global Feed","Bluetooth","bluetooth sucks"]
---

It all started with an idea for better telescope images.

I take photos using my phone. My telescope shakes when I press the capture button. I have a raspberry pi pico W, which recently added bluetooth. I wonder if I can connect the pico to my phone as a bluetooth device so I could press a button on the pico and remotely take a snapshot.

## Bluetooth is a nightmare

the C++ standard is a mess of inscrutable acronyms. Apparently there's multiple types of bluetooth services, keyboards and mice are called "HID" for human input device, I think bluetooth audio is called HSP for HeadSet Profile. Will that do what I want? Hope so, because I don't know how to test yet! I found https://github.com/raspberrypi/pico-examples#pico-w-bluetooth, but clicking the links just takes you to some inscrutable C examples from the BTstack library. On the plus side, maybe that means things made for the BTstack library will simply work.

I found a micropython UART example, but my phone wouldn't connect to it, possibly because it only supports specific services? sigh

## I start to get it

okay, I'm starting to get this. bluetooth is many protcols in one, GATT is the meta-protocol that tells you what protocol you should use, each protocol has a number assigned to it like 0x180F for "telling you how much battery I have", you can only find the numbers by searching a giant inscrutable PDF which doesn't tell you what anything means.

## Oh gosh which service will let me press volume down

Do I want...
0x1812 Human Interface Device (which I know is for keyboards and mice)
0x1843 Audio Input Control
0x1849 Generic Media Control
0x1848 Media Control
0x1855 Telephony and Media Audio
0x1844 Volume Control

Good question! Apparently the list of magic service numbers on https://www.bluetooth.com/specifications/assigned-numbers/ doesn't actually say what each service does, and you need to go to https://www.bluetooth.com/specifications/specs/ and read a giant specification to find out! Yay!!


{{< gallery >}}
{{< figure alt="" src="voldown.png" >}}
{{< /gallery >}}


This image is all you get for "how to reduce the volume". It doesn't even say what Opcode or Change_Counter stand for. To do that I need to go to another paragraph which says "Change_Counter is read from Volume State"??? aargh

## A page from the bluetooth HeadSet Protocol dscribing cases where this newfangled bluetooth technology might be used

{{< gallery >}}
{{< figure alt="" src="bluetoothexamples.png" >}}
{{< /gallery >}}

every single one of these 3 pictures is glorious


## Pain


{{< gallery >}}
{{< figure alt="" src="volcontrol.png" >}}
{{< /gallery >}}


Ah, of course, the Volume Control Service is 0x1844 in the Assigned Numbers document, but you need to read the Volume Control Service document to learn that you also need Volume State and Volume Control Point characteristics. Naturally now that you know what characteristic names you need, their magic numbers (which are the true things you need) aren't kept in this document, and you need to go back to the first one into this table. I wish it was sorted by "numbers you need for this service" instead of ALPHABETICALLY

## A computer update

My computer can see what bluetooth services my phone supports.

It doesn't support any of the 18xx fancy Bluetooth Low Energy profiles. NONE of them! There goes my work understanding Volume Control Service.

## I gave up trying to use micropython and now I'll just use C++

turns out, the official bluetooth examples https://github.com/raspberrypi/pico-examples are missing the actual bluetooth examples. you need to build these examples using make to generate the actual example code. of course they also give no instructions for building those examples.

I tried:
`cmake pico_sdk_import.cmake`? Nope, CMake Error: The source directory is a file, not a directory.

`cmake .`? 
CMake Error at pico_sdk_import.cmake:55 (message):
  SDK location was not specified.  Please set PICO_SDK_PATH or set
  PICO_SDK_FETCH_FROM_GIT to on to fetch from git.`

`cmake . PICO_SDK_FETCH_FROM_GIT=1`?
CMake Warning:
  Ignoring extra path from command line:

   "PICO_SDK_FETCH_FROM_GIT=1"


Turns out PARTIAL instructions are in https://github.com/raspberrypi/pico-sdk, and the implication is: they want me to edit the file CMakeLists.txt to add the line `set(PICO_SDK_FETCH_FROM_GIT on)`. WHY WOULD YOU NOT WRITE THIS DOWN

## Not all keyboards are made equal

I got an example working! Turns out the unofficial code that lets you code a Pico from the Arduino IDE has its own example classes for acting as a bluetooth keyboard or mouse. You can't actually see their sample code without going [here](https://github.com/earlephilhower/arduino-pico/tree/master/libraries) and looking for a library with BLE at the end of its name, but they work!

I tried sending the HID_KEY_VOLUME_DOWN key and it... did nothing.

After many hours of banging head against wall: I think not all keyboards are made equal, and as part of the bluetooth protocol a device send a "HID report descriptor" which says what buttons it has on it. Of course, HID_KEY_VOLUME_DOWN naturally isn't part of the keyboard, it's a completely separate thing called CONSUMER_CONTROL and the arduino-pico's keyboard class doesn't include the arcane hex constants that say "I can do consumer control device things like volume down" in its report descriptor. aaaaargh

## Protocols all the way down

HID (Human Interface Device, the protocol for Bluetooth keyboards and mice) is a nightmare. It's ALSO a protocol made of protocols. In fact, at the start of a HID connection the device needs to define its protocol by sending some arcane constants called the device descriptor which says what format all the future messages (called "reports") will be in. And, of course, there can be multiple types of reports in the same device, with different formats. Turns out you can't push Volume Down unless the device descriptor says "I have both a keyboard and a consumer control device". Then you have two types of reports, and you send a report ID with each report to say whether you're sending a keyboard type report or a consumer control type report. So you define your own custom protocol on top of HID on top of GATT on top of BLE! I'm four protocols down!

Remember, I want to take a picture on my phone. I thought the best way to do that is to press the volume down key.

The Arduino IDE for the Pico has a BLE keyboard library hidden in the examples. No BLE Consumer Control example library. Other people have Consumer Control libraries, so I spent a long time trying to modify the device description from "I am a keyboard" to "I am both a keyboard and a consumer device" and trying to figure out how to send the right report format.

Remember that report ID? That's how normal Bluetooth works. Turns out all my effort was for naught because the BLE functions physically didn't have a place to put that report ID. Turns out HID with BLE handles multiple report formats in a slightly different way compared to HID over normal bluetooth. And that's when I realized something.

## The end

I embarked on this quest to press the volume down button. But I don't need to press the volume down button. I realized I could just click the take picture button with a mouse instead!

So I looked at the Bluetooth mouse library, and successfully used it to make the mouse move!

Sure, the "move to absolute position" didn't work, and packets kept dropping if I sent them too quickly, and you can only move 128 pixels in a single move, and I can't know where I am on the screen without moving to the bottom left repeatedly to reset the mouse position...

But I can finally press a button on my Pico, and watch the mouse move to the corner, then move to and click the "take picture" button! I declare: ABYSS SUCCESSFULLY GAZED
