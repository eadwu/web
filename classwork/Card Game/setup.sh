#!/usr/bin/env sh
PWD=$(dirname "$(readlink -f "$0")")

curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/l702epuh6wgq2yc/Card_Game_images.zip?dl=0"
npx extract-zip "${PWD}/tmp.zip" "${PWD}/assets"
rm -f "${PWD}/tmp.zip"
