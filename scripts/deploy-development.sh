#!/bin/bash

yarn build

docker build --platform linux/amd64 -t gcr.io/fastsurvey-infrastructure/console-dev .
docker push gcr.io/fastsurvey-infrastructure/console-dev:latest

VITE_COMMIT_SHA="$(git rev-parse --short --verify HEAD)"
gcloud run deploy console-dev \
    --image=gcr.io/fastsurvey-infrastructure/console-dev:latest \
    --platform managed --tag "commit-$VITE_COMMIT_SHA"