---
title: "Making an Eclipse Timelapse, Two Years Later"
date: 2026-04-26
tags: ["eclipse"]
---
{{< gallery >}}
{{< figure alt="The timelapse!" src="eclipse_full_v1_unstabilized.mp4" >}}
{{< /gallery >}}

Click the preview above to see the timelapse!

This is a several hour long timelapse of the 2024 eclipse, made from all the photos I took on that day. These images was taken by a phone camera looking through an 80" finderscope with a solar filter on it. A raspberry pi pico connected to the phone and acted like a bluetooth mouse to "click" the shutter button and take photos.

- Tracking mounts are expensive, so instead I moved the Dobsonian mount by hand
- I sped up the rate at which images were being taken just before totality.
- During totality, I planned to have the pico take a variety of images with different exposure times. Unfortunately, it skipped straight to the one-second exposures, the extra processing lag messed up the mouse position, and by the time I restarted the sequence totality was almost over. I got exposure times that were too short and too long and none just right :(
- It was an incredibly cool experience. Not the pitch blackness I was expecting, but instead a dark blue sky with a ring of orange around us.

To make this exposure, I wrote some python to process each .raw file into a .tif (PIL doesn't support 16-bit RGB images, it seems). 

I attempted to stabilize the image by moving each image to an approximate center point. My first attempt selected the row and column with the highest brightness sum and cropped around it. That resulted in an incredibly shaky camera, and is not what you're seeing here.

This image is also on my [Favorite Astrophotos](/astrophotos) page!
