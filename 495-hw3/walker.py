#!/usr/bin/python

import os
import subprocess
import shlex

mycwd = os.getcwd()

dirs = [f for f in os.listdir('.') if not os.path.isfile(f)]

for d in dirs:
    if d == "inputs" or d == "outputs" or d == "outputs_2":
        continue
    else:
        print "Starting with " + str(d)
        args = "./starter.sh " + str(d)
        args = shlex.split(args)
        p = subprocess.Popen(args, cwd = mycwd + '/' + d)
        p.wait()
