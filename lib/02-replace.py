#!/usr/bin/env python

import os
import sys

PROJECT_SHORTNAME = sys.argv[1]
PROJECT_DIR = sys.argv[2]

SUBSTITUTIONS = [
    ['SHORTNAME', PROJECT_SHORTNAME]
]

for folder, subs, files in os.walk(PROJECT_DIR):
    for filename in files:
        contents = ''
        with open(os.path.join(folder, filename), 'r') as template:
            for line in template:
                line_replaced = line
                for s in SUBSTITUTIONS:
                    line_replaced = line_replaced.replace(('@@%s@@' % s[0]), s[1])
                contents += line_replaced
        with open(os.path.join(folder, filename), 'w') as template:
            template.write(contents)
