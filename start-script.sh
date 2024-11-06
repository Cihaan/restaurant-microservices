#!/bin/bash

echo "GENERATING .env FILE..."

jq -r '
paths(scalars) as $p
| [($p | join("_") | ascii_upcase), (getpath($p) | tostring)]
| join("=")
' settings.json > .env

sed -i '/^$/d' .env

echo ".ENV FILE GENERATED"

echo "STARTING DOCKER COMPOSE..."

docker-compose up --build


