#!/bin/bash

export VITE_COMMIT_SHA="$(git rev-parse --short --verify HEAD)"
yarn build

docker build -t gcr.io/fastsurvey-infrastructure/console .
docker push gcr.io/fastsurvey-infrastructure/console:latest

gcloud run deploy console \
    --image=gcr.io/fastsurvey-infrastructure/console:latest \
    --platform managed --no-traffic --tag "commit-$VITE_COMMIT_SHA"