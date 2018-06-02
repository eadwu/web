#!/usr/bin/env sh
PWD=$(dirname "$(readlink -f "$0")")

curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/pu4m8o9tgab2z5x/Data_Gallery_assets.zip?dl=0"
npx extract-zip "${PWD}/tmp.zip" "${PWD}"
rm -f "${PWD}/tmp.zip"
