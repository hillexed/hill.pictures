
---
title: "I think I figured out why the pifinder recommends you use a beefy raspberry pi 3. "
date: 2023-09-11T04:28:35.230Z
tags: ["astronomy","pifinder","hillescopebuilding"]
---

The code's open source, so I looked through it. Turns out every time it tries to draw a map of the sky, it loops through every single star in the sky down to magnitude 7.5. Every frame. Sigh

At least it's open source, so I can probably add some caching and massively speed it up.

