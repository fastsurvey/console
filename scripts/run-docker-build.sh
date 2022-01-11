#!/bin/bash

docker kill console-dev
docker container rm console-dev

yarn build:development
docker build -t gcr.io/fastsurvey-infrastructure/console-dev .
docker run -d -p 8080:8080 --name console-dev gcr.io/fastsurvey-infrastructure/console-dev:latest
