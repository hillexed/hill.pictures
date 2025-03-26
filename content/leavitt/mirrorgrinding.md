---
title: "The Mirror Making Process"
---

(This page is a work in progress!)

I dove into the rabbit hole of optical fabrication and made my own mirrors for my 8" Leavitt telescope.

When we think of mirrors, we think of mirrors like those on a bathroom wall, which are flat. Telescope mirrors are curved, to focus light to a point. This curvature focuses parallel light rays everywhere on the mirror's surface to the same place, increasing the amount of light the eye can see when looking through a telescope. This curve must be smooth to within a fraction of a wavelength of visible light - 500 nanometers. It is incredible that we can make surfaces that smooth using just muscle power. 

There are four main steps to mirror making: rough grinding, fine grinding, polishing, and parabolizing. 

1. Rough grinding carves a depression of the right curvature in a piece of glass. 
2. Fine grinding smooths the surface using a succession of smaller and smaller grits.
3. Polishing uses a new tool and cerium oxide to make the glass reflective for the first time, creating a reflective sphere.
4. Parabolizing, also known as "figuring", slightly adjusts the extremely precise sphere to create an extremely precise parabola.

Then there is one final step: aluminizing. After the first four steps a mirror is a fully usable precisely shaped reflective piece of glass, but covering the glass with a thin layer of shiny metal increases the amount of light reflected to around 90%. This step requires a vacuum chamber. I don't have a a vacuum chamber. Instead, I did what most amateurs do and shipped my mirror to someone else. Aluminizing was its own shenanigan - more on that below. 

# The Materials

Telescope mirror glass has gotten expensive nowadays. I was very lucky: I got mine through social media. I had blogged about the process of creating my first 3D printed telescope, Hadley. When I mused online about falling down the rabbit hole of mirror making, I recieved a wonderful comment: @BeasMeeply on cohost had an abandoned mirror making project that had sat in a closet gathering dust for 10 years, and graciously offered to send it to me for the cost of shipping. After that, I had no choice but to dive in.

## Making tools

Making a mirror involves rubbing two surfaces against each other to make each other smooth, one concave (the mirror) and one convex (the tool). In the olden times, glass was cheap and a second piece of glass would make a good tool. Now that 8" glass circles are almost $100, a cheaper way is to cast a plaster disk. There are two requirements for this: 1) waterproof plaster, and 2) porcelain tiles embedded in the plaster, to match the hardness of the glass and ensure the soft plaster doesn't simply get ground away.

Dentists use waterproof plaster called "dental stone" to take tooth impressions, and it works great. Unfortunately, dental stone is usually sold in 45 lb boxes for $50, and I only need 2lb or so. I got my dental stone from... having a dentist appointment and asking my dentist nicely!

I got hexagonal porcelain tiles from Home Depot for $5. I learned the hard way to keep the webbing on.

Dental stone hardens incredibly quickly - within 10 minutes of adding water and mixing. I learned the hard way to set a timer for four minutes before pouring.

## Polishing
When I got the mirror, first I used spherometer to measure the curve - same curvature all around, accurate to within 0.0002 inches. I put it in a foucalt tester, and after lots of help and fiddling I got some pictures of the result:

{{< gallery >}}
{{< figure alt="" src="IMG_20231007_152202849_smol.png" >}}
{{< /gallery >}}

 The fact that it's transparent enough that I can see through the glass and get a result in the foucalt test tells me @BeasMeeply got through grinding and polishing, and now I can skip to making a pitch lap.

## Homemade 3D printed ronchi tester

I built a 3D printed Ronchi tester to test my mirror's surface shape. Handheld and easily portable, it uses an LED, a 9 volt battery, a switch, and a Ronchi grating of evenly spaced lines sent to me by a telescope-making friend in France. It lets me bounce light off the mirror and 

For more on the Ronchi test, see here. 

Depending on where each part of the mirror focuses light, the pattern of lines that is reflected back to the LED will look longer or shorter. I made this infographic of how to interpret test results:

The Ronchi test is great at detecting astigmatism, turned down edges, and overall parabolization progress. It is so sensitive that you can see air turbulence or uneven heating from the wobbling of the lines! However, that sensitivity requires taking pictures of the Ronchi pattern and comparing them on a computer, using this wonderful calculator by Mel bartels. A spherical mirror shows up as perfectly straight lines up and down. However, detecting straightness by eye (or even by computer) is very tough, and if you want a 1/10th wave finish or better, slight surface issues can be visible if you are good at dialing in a Foucalt test to the center of curvature but escape a Ronchi test. I have found that sometimes seeing an issue in a Foucalt tester, I have gone back and seen the issue in the Ronchi. 

For my mirror, I used my Ronchi tester to guide overall spherical progress as well as parabolization, but used the Foucalt test with a Couder mask to take numerical readings for the final stretch of parabolization.

## Parabolizing

The process of parabolizing involves turning an incredibly precise sphere into an incredibly precise parabola. measuring the mirror's surface 

I tried parabolizing three times, since twice I had to restart. Experts at my local astronomy club were able to spot 1/10th wave defects in a surface I thought was spherical, and insist I smooth out the surface.

In total, polishing and parabolizing took 32 hours of cumulative polishing time. This was not a way to save time or money. It is a lot of time spent moving a piece of glass back and forth. As I write this in 2025, an 8" mirror can be bought from Chinese company GSO for $300 on AgenaAstro. If all you wanted was a mirror, the correct answer is to spend 32 hours working a part time job and use that money to buy a mirror. That said, the commercial mirrors would only be smooth to within 1/4th of a wavelength, while mine is smooth to within 1/20th of a wavelength. Plus, I had fun!

### Cardboard Couder Mask

I drew circles on cardboard with a ruler and compass traced them out to create this cardboard mask. This isolates parts of the mirror at different points from the center to the edge. The zone radii aren't regular, but are instead chosen so that each zone focuses light 

### The spreadsheet

I made a spreadsheet that would take knife-edge measurements of the Couder mask zones and from there integrate to compute the total shape of the mirror. This helped me with the final few steps of the process.


