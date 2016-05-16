#!/bin/bash

source lib/shared.sh

cd $2

log "npm & bower install"
npm install
bower install

log "please add the following to your hostfile: 127.0.0.1 $1.dev"
echo
