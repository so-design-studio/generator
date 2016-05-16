#!/bin/bash

source lib/shared.sh


if [ "$#" -ne 1 ]; then
  echo "usage: so-generator <project-name>"
  exit 1
fi

TEMPLATE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../template"
NEW_DIR="$(pwd)/$1"

if [ -d "$NEW_DIR" ]; then
  echo "$NEW_DIR: directory exists"
  exit 2
fi

log "duplicating to $NEW_DIR"
cp -r "$TEMPLATE_DIR" "$NEW_DIR"
