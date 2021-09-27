#!/bin/bash

export VITE_COMMIT_SHA="$(git rev-parse --short --verify HEAD)"
yarn build
docker build -t gcr.io/fastsurvey-infrastructure/console .
