#!/usr/bin/python
import os
import subprocess
import re
import shlex

files = [f for f in os.listdir('.') if os.path.isfile(f)]
cwd = os.getcwd()
replaced = re.sub(' ', '\ ', cwd)

homeworkfiles = []
homeworkdirectories = []

for f in files:
    if f[0] == 'e':
        homeworkfiles.append(f)
        homeworkdirectories.append(f[0:8])
        if not os.path.exists(cwd + '/' + f[0:8]):
            os.makedirs(f[0:8])

for hwfile, hwdirectory in zip(homeworkfiles, homeworkdirectories):
    args = "tar -xzvf " + hwfile + " -C " + hwdirectory
    args = shlex.split(args)
    p = subprocess.Popen(args)
    p.wait()