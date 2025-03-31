#!/bin/sh

# Copy .env.example to .env only if .env doesn't exist
if [ ! -f .env ]; then
  echo "No .env found, copying from .env.example..."
  cp .env.example .env
fi

docker compose up

cd pb_data
unzip -o backups/testdata.zip
docker restart pocketbase