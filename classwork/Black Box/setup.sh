#!/usr/bin/env sh
PWD=$(dirname "$0")

curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/dsev1b1e5aob9w3/Black_Box_images.zip?dl=0"
unzip "${PWD}/tmp.zip" -d "${PWD}"
rm -f "${PWD}/tmp.zip"
