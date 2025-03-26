---
title: "How Microprocessors Make Music"
date: 2022-11-12T18:11:52.316Z
tags: ["music","synthesizers","longpost","computers"]
---
{{< gallery >}}
{{< /gallery >}}

So I've been working on trying to make a little Arduino powered synthesizer recently! Turns out it's hard and sound is complicated and now I'm cursed with knowledge. The only way to get rid of curses is to dilute them, so here's everything I've learned about how to make sound on an Arduino.

### Speakers

A speaker takes some electricity and moves a little flat thing either outwards or inwards depending on the voltage, which pushes on air and makes sound. They convert changing electricity to changing sound waves. For a microprocessor to make sound, it needs to change voltage really fast so the speaker makes the right sound wave.

### The Simplest Square Sound

Computers use zeroes and ones. Those are usually voltages: a zero is a low voltage, and an one is a high voltage. Any Arduino pin can easily output a zero or one, in the form of either 0 volts ("0V") or 5 volts ("5V"). However, not all pins can output the values in between. Thankfully, there's one easy type of sound wave you can output using only 0V and 5V: a square wave at maximum volume, which switches between 0V and 5V at a high frequency. Arduinos even have a built-in tone() function to do that, which uses a timer (timer1, which I'll get to later) to manually switch whatever pin you want between 0V and 5V really fast in software. Unfortunately, to output other types of waves (like sine waves), or even just control a wave's volume so your wave can fade out over time, you need to output values between 5V and 0V. For that you need PWM.

### All the other sounds: PWM

PWM works like this. Let's say you want to output 1 volt. Unfortunately, an Arduino physically cannot output 1 volt - it can only output 100% of 5V or 0% of 5V, with no in between. If only you could just output 20% of 5V. The arduino can't output 20% of 5V, but it can output 5V, 20% of the time. If you switch between 5V and 0V really fast, outputting 0V the other 80% of the time, it averages out to 1V! That's Pulse Width Modulation (PWM): switching between 5V and 0V really fast in order to output signals which are, on average, any voltage you want between 5V and 0V. (To do the averaging, usually a resistor and capacitor are placed in between the output and the speaker to act as an "RC filter".)

## Timing is everything

An Arduino has hardware built into the chip to do PWM. But that hardware is only built into certain pins of the chip. That's because in order to switch between 5V and 0V fast enough to average out, you need a very fast and accurate timer to tell you when to switch. The ATMega328 chip which most Arduinos use has 3 timers built into it, so you can run 3 PWM outputs at different speeds at once if you really wanted to.

To control PWM, you're really controlling the timers, and so you need to set specific bits in specific arcanely-named all-caps acronym variables like OCR1A which you can only understand by looking up "ATMega328 datasheet" and banging your head against a wall.

Timer 0 is used for the system functions millis() and micros(), so it's encouraged not to use it if you have the option. Timer1 is a 16-bit timer, which means its PWM pins can output any multiple of 5/(2^16) volts at once. However, it can only output to digital pin 9 or pin 10 (hardware-chip-footprint-numbers 15 and 16). Timer2 is an 8-bit timer, which means it has less resolution than Timer1 and can only output 2^8 different values between 5V and 0V. It outputs on digital pin 11 or digital pin 5 (hardware-chip-footprint-numbers 17 and 11). That's worse for audio, because you want smoother waves. Use timer 1.

## PWM has some rough edges

Let's say I want to output a sine wave at a frequency `a`. Mathematically, I want to output the function `sin(at)`, where `t` increases over time. Mathematical sine waves are smooth, with infinite resolution. Unfortunately, sine waves created by computers are really just numbers, and those numbers have a fixed resolution.

Let's say we're using an 8-bit PWM. In order to use PWM and output your wave, you must tell the PWM an integer between 0 and 2^8 = 255, and it will interpret 0 means 0V and 255 means 5V, and anything in between is treated as a fraction with 255 on the bottom: 20 means 5 * 20/255 volts. The inputs are converted to integers. That means even if your wave is continuous, any values in between any two integers such as 4 and 5 will be rounded to either 4 or 5. Even if the math says your wave should output the value sin(1) * 255 = 4.45, that number will be rounded down to 4 and output 0.078V instead of 0.087 V.

(Math note:  sin(at) is centered at y=0 and ranges from y=-1 to y=1. To properly fit sin(at) into the range 0 to 255, you really want to output `sin(at) * 128 + 127` so that the center point is 127, the center of the 0-255 output range.)

The 8-bit timer forces us to round our numbers to 8-bit integers (0-255), and that causes some effects you can hear. Specifically, the rounding might sound like the wave is "tinny", or has some extra buzzing. Some people like that sound because it reminds them of the old days of 8-bit computers and will add that effect into music on purpose, which is called "bitcrushing".

In general, squeezing a wave into k bits will distort the sound less and less the bigger k is. 8-bit is pretty noticeable. 16-bit lets the values range from 0 to 2^16, and there's basically no distortion. 16-bit audio is CD quality. Avoid 8-bit PWM for audio output and use something with more bits if you care about audio quality.

## Multiple notes at once? That's not in the budget

A piano can play more than one note at the same time. I want my microprocessor to be able to do that too!

Let's say I'm stuck with my 8-bit timer, and I want to output two notes at once. Thankfully, it's not too bad: to hear two things at once, just add up the waves. Then, output `sin(at) + sin(bt)`. That's just a number, so I can output it fine using PWM, right?

Unfortunately, `sin(at)` and `sin(bt)` both range from -1 to 1, so adding them together could give me a number anywhere from -2 to 2. That means if I used the same formula as before to convert the waves into the 0-255 range, `wave(t) * 128 + 127`, I'd get a value from −129 to 383, which is outside the valid 8-bit timer range 0 to 255. Whoops.

To fix this, instead of outputting `sin(at) + sin(bt)`, shrink the wave vertically so it ranges from -1 to 1 by dividing by 2. Output `(sin(at) + sin(bt))/2`. Perfect. 

You can even generalize this: to play eight notes at once, add up the 8 individual waves and divide by 8, and your signal will stay between -1 and 1. If you want your Arduino to be able to play up to 8 waves at once, you'll want to output `(wave1 + wave2 + wave3 + wave4 + wave5 + wave6 + wave 7 + wave8)/8`. If you convert that into the range 0-255, it'll be `(wave1 + wave2 + wave3 + wave4 + wave5 + wave6 + wave 7 + wave8)/8 * 255 + 127`. If you're not playing all 8 notes at once, some of those waves might be 0 the entire time and not some form of sin(t).

However, if you program that into your microprocessor, then even just one note might sound very distorted! Why?

Remember, the less bits you have to store a wave, the more distorted it'll sound. If sin(x) can take any value between -1 and 1, it's converted to 8-bit number that's rounded to any value between 0 and 255. But if 8 notes can be played at once, and we divided by 8, we're effectively adding waves of the form `sin(x)/8`, which is rounded to an integer between 0 and 32. 

This rounding has two effects: first, using the same speaker, our original 0-255 wave moves the speaker eight times more distance compared to an 0-32 wave, so the new wave sounds much quieter*. (This problem once tricked me into thinking my code stopped working, when really it was just too quiet to hear.) Second, rounding a wave to one of 32 values adds a LOT more distortion than rounding to one of 256 values, and you can hear that distortion very strongly.

*the wave is eight times weaker, but we hear volume logarithmically so it only sounds log_2(8) = 3 times weaker.

You could think of this as a "bit budget": you can either spend your 0-255 range on one high quality wave, or give each wave 1/8th of the total range to represent them so that you can add up to 8 waves at once at the cost of bitcrushing each individual wave.

Use 16-bit outputs. That way you can play multiple waves at once without running into the bitcrushing problem as much, because an 0-65536 range divided by 8 is still a very high quality 0-8192 range. You'll still have to make the speaker louder to counteract the volume loss from dividing your waves to play multiple notes at once, however. 

## Also, there's intense time pressure

Humans can hear waves up to 20kHz, which means if you want to be able to output all possible waves a human can hear, your microcontroller needs to choose which value to output 40,000 times a second. That includes doing any math to compute sin(x), adding the waves from multiple notes at once, etc. It's not too bad if you only play one note at once - in fact, for a square wave you can simply use a timer - but if you want to play multiple notes at once, time starts to become a problem.

An Arduino runs at a 16mHz clock speed by default. That means whatever code you write to choose which 0-255 or 0-65536 value to output, that code needs to involve less than 16000000 / 40000 = 400 machine instructions. Your function needs to be FAST. If it takes too long, you'll get distortion!

Writing fast code is hard. I've successfully gotten up to 4 waves added together on an Arduino, but but as soon as I tried adding a few more additions to bring it up to 6 waves at a time, my code took too long to compute, lagged, and made weird digital noises instead of my crisp waves. Want to compute (wave1 + wave2 + wave3)/3? Too slow. The ATMega chip doesn't have a division instruction built in, so dividing by 3 takes as much time as a good fraction of the rest of my code combined.

A library called Mozzi solves the gotta-go-fast problem by having its fast function be "read one value from the precomputed buffer and output it", then updating that precomputed buffer only once every 256 function calls. Another technique for outputting waves quickly is called "wavetable synthesis", where you save many values of sin(x) for various x in a table 1024 entries long, and that way accessing table[x] is very quick. Other projects go fast by abandoning the Arduino's ATMega328 chip for an even faster computer, such as a Teensy. In fact, the device you're reading this on is much faster than either of those, and that's why people usually make music with computers nowadays.

## In summary

Computers are made of workarounds upon workarounds upon workarounds, modern processor speeds are a miracle we take for granted, and I'd say music was a mistake but actually the cool noises you get at the end are worth it. 

