#!/bin/bash

yarn build
docker build -t gcr.io/fastsurvey-infrastructure/console-dev .
