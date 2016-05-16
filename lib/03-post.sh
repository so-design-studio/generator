#!/bin/bash

source lib/shared.sh

cd $2

log "npm & bower install"
npm install
bower install

log "adding $1.dev to hostfile"
sudo echo "127.0.0.1 $1.dev" >> /etc/hosts
