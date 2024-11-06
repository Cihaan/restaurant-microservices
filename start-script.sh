#!/bin/bash

echo "INSTALLING DEPENDENCIES..."

if ! command -v npm &> /dev/null; then
  echo "ERROR: npm is not installed. Please install npm before running this script."
  exit 1
fi

npm install

echo "DEPENDENCIES INSTALLED"

echo "GENERATING .env FILE..."

jq -r '
paths(scalars) as $p
| [($p | join("_") | ascii_upcase), (getpath($p) | tostring)]
| join("=")
' settings.json > .env

sed -i '/^$/d' .env

echo ".ENV FILE GENERATED"

echo "STARTING DOCKER COMPOSE..."

docker-compose up --build -d


