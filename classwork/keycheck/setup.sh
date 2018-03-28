#!/usr/bin/env sh
PWD=$(dirname "$(readlink -f "$0")")

curl -sSL -o "${PWD}/image.jpeg" "https://secure.gravatar.com/avatar/6a653bfe0f03115356de4af715344feb?s=100&d=identicon"
