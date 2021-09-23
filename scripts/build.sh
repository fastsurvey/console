#!/bin/bash

export COMMIT_SHA="$(git rev-parse --short --verify HEAD)"
echo "VITE_COMMIT_SHA=${COMMIT_SHA}" > .env
yarn build
docker build -t gcr.io/fastsurvey-infrastructure/console .
