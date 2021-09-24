#!/bin/bash

# https://codelabs.developers.google.com/codelabs/cloud-run-deploy/index.html

docker push gcr.io/fastsurvey-infrastructure/console:latest

gcloud run deploy console \
    --image=gcr.io/fastsurvey-infrastructure/console:latest \
    --platform managed
