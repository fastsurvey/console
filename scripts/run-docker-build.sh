#!/bin/bash

yarn build:development
docker build -t gcr.io/fastsurvey-infrastructure/console-dev .
docker run -p 8080:8080 gcr.io/fastsurvey-infrastructure/console-dev:latest
