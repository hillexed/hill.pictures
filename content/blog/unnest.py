import os
import json
import shutil
import re

n=0


for folder in sorted(os.listdir()):

    if not os.path.isfile(f"{folder}/_index.md"):
        continue

    print(folder)

    n +=1

    alts = []

    with open(f"{folder}/post.json") as f:
        m = re.findall(r'"altText":"([^"]+)"', f.read())
        if m:
            alts = [s for s in m]

    imgs = [file for file in os.listdir(folder) if not file.endswith("_index.md") and not file.endswith("post.json")]

    for imgfile in imgs:
        if imgfile == "image.png":
            os.rename(f"{folder}/image.png", f"{folder}/{folder}-image.png")
            imgs = [file for file in os.listdir(folder) if not file.endswith("_index.md") and not file.endswith("post.json")]

    lines = None
    imgcount = 0
    with open(f"{folder}/_index.md", 'r') as f:
        lines = f.readlines()

        for i,line in enumerate(lines):
            if line.strip() == '{{< figure alt="" src="image.png" >}}':
                alt='a'

                if imgcount > len(imgs):
                    raise ValueError(f"UH OH missing images in folder {folder}! {len(imgs)} of them, but line {i}")

                src = imgs[imgcount]
                print(("Adding a reference to image ", src))
                lines[i] = '{{< figure alt="' + alt + '" src="' + src +'" >}}'
                imgcount += 1

    with open(f"{folder}/_index.md", 'w') as f:
        if lines is not None:
            f.writelines(lines)

    postname = folder
    os.rename(f"{folder}/_index.md", f"{folder}/{postname}.md")
    os.remove(f"{folder}/post.json")

    for file in sorted(os.listdir(folder)):
        if os.path.isfile(file):
            raise ValueError(f"file {file} already exists!")
        # move files to root directory
        os.rename(folder + os.sep + file, file)
        print(f"moved {folder + os.sep + file} to {file}")
