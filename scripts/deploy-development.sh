#!/bin/bash

export VITE_COMMIT_SHA="$(git rev-parse --short --verify HEAD)"
export VITE_ENV="development"
yarn build

docker build -t gcr.io/fastsurvey-infrastructure/frontend-dev .
docker push gcr.io/fastsurvey-infrastructure/frontend-dev:latest

gcloud run deploy frontend-dev \
    --image=gcr.io/fastsurvey-infrastructure/frontend-dev:latest \
    --platform managed --tag "commit-$VITE_COMMIT_SHA"