#!/usr/bin/env sh
PWD=$(dirname "$(readlink -f "$0")")

curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/idtvj3l2eh8yzhm/Lato.zip?dl=0"
npx extract-zip "${PWD}/tmp.zip" "${PWD}/fonts/Lato"

curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/9v4bdttz8gvprri/zelega-zenega.zip?dl=0"
npx extract-zip "${PWD}/tmp.zip" "${PWD}/fonts/zelega-zenega"

curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/tgql6mzt4icdnny/product_page_images.zip?dl=0"
npx extract-zip "${PWD}/tmp.zip" "${PWD}/images"
rm -f "${PWD}/tmp.zip"
