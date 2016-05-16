#!/bin/bash

export SO_GENERATOR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export SO_TEMPLATE_DIR="$SO_GENERATOR_DIR/../template"
export SO_PROJECT_DIR="$(pwd)/$1"
export SO_PROJECT_SHORTNAME="$1"

source "$SO_GENERATOR_DIR/shared.sh"


if [ "$#" -ne 1 ]; then
  echo "usage: so-generator <project-name>"
  exit 1
fi

if [ -d "$SO_PROJECT_DIR" ]; then
  echo "$SO_PROJECT_DIR: directory exists"
  exit 2
fi


log "duplicating to $SO_PROJECT_DIR"
cp -r "$SO_TEMPLATE_DIR" "$SO_PROJECT_DIR"


log "template substitutions"
"$SO_GENERATOR_DIR/replace.py"
if [ $? -ne 0 ]; then
  log "template substitutions failed"
  exit 3
fi


cd $SO_PROJECT_DIR

log "npm & bower install"
npm install
bower install

log "please add the following to your hostfile: \"127.0.0.1 $1.dev\""
echo
