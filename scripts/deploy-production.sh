#!/bin/bash

yarn build

docker build --platform linux/amd64 -t gcr.io/fastsurvey-infrastructure/console .
docker push gcr.io/fastsurvey-infrastructure/console:latest

gcloud run deploy console \
    --image=gcr.io/fastsurvey-infrastructure/console:latest \
    --platform managed --no-traffic --tag "commit-$VITE_COMMIT_SHA"