#!/bin/bash

export VITE_COMMIT_SHA="$(git rev-parse --short --verify HEAD)"
yarn build
docker build -t fastsurvey-console .
docker run -d -p 8080:8080 fastsurvey-console:latest