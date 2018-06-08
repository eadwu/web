#!/usr/bin/env sh
PWD=$(dirname "$(readlink -f "$0")")

# images/
curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/l702epuh6wgq2yc/Card_Game_images.zip?dl=0"
npx extract-zip "${PWD}/tmp.zip" "${PWD}"
# fonts/
curl -sSL -o "${PWD}/tmp.zip" "https://www.dropbox.com/s/idtvj3l2eh8yzhm/Lato.zip?dl=0"
npx extract-zip "${PWD}/tmp.zip" "${PWD}/fonts/Lato"

# cleanup
rm -f "${PWD}/tmp.zip"
