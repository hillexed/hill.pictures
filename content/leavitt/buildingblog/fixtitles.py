import os
import json
import shutil

n=0


for folder in sorted(os.listdir()):

    if not os.path.isfile(f"{folder}/_index.md"):
        continue

    print(folder)

    n +=1
    with open(f"{folder}/_index.md",'r') as f:
        l = f.readlines()

        if l[0] == "\n":
            l = l[1:]
        print(l[1].count('"'))
        if l[1].count('"') == 3:
            print("oh no")


        i1 = l[1].find('"')
        i2 = l[1].rfind('"')

        word = l[1]
        l[1] = word[:i1] + "'" + word[i1+1:]
        word = l[1]
        l[1] = word[:i2] + "'" + word[i2+1:]
        
        print(l[1])

    with open(f"{folder}/_index.md",'w') as f:
        f.writelines(l)
