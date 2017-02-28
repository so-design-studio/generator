#!/usr/bin/env python

import os
import sys

PROJECT_NAME = os.environ['PROJECT_NAME']
PROJECT_DIR = os.environ['PROJECT_DIR']
OPS_NAMESPACE = os.environ['OPS_NAMESPACE']
REPO_URL = os.environ['REPO_URL']


SUBSTITUTIONS = [
    ['NAME', PROJECT_NAME],
    ['OPS_NAMESPACE', OPS_NAMESPACE],
    ['REPO_URL', REPO_URL],
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
