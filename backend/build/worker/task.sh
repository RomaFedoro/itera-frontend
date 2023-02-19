#!/bin/bash

source /etc/environment

export DB_URL="postgresql://postgres:password@database:5432/itera?schema=public"

npx jiti /app/src/worker
