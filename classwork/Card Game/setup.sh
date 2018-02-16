#!/usr/bin/env sh
PWD=$(dirname "$0")

curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/l702epuh6wgq2yc/Card_Game_images.zip?dl=0"
unzip "${PWD}/tmp.zip" -d "${PWD}/assets"
rm -f "${PWD}/tmp.zip"
