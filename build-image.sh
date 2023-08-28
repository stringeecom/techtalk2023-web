#!/bin/bash

IP=35.240.131.31
USERNAME=huydaungoc
KEY_FILE=~/.ssh/test-master-3.key

echo "Start zip file"
rm -Rf dist.zip

cd dist || exit
zip -r ../dist.zip ./*
cd ..

echo "Upload file to server"
scp -i ${KEY_FILE} Dockerfile ${USERNAME}@${IP}:/home/huydaungoc/deploy-local/tech-talk/video-demo-web/Dockerfile
scp -i ${KEY_FILE} dist.zip ${USERNAME}@${IP}:/home/huydaungoc/deploy-local/tech-talk/video-demo-web/dist.zip

echo "Start build image on server"
ssh -i ${KEY_FILE} ${USERNAME}@${IP} -T "cd /home/huydaungoc/deploy-local/tech-talk/video-demo-web && \
          rm -Rf dist && \
          unzip dist.zip -d dist && \
          docker build -t hub-server.stringee.io/video-call-demo:master . && \
          docker push hub-server.stringee.io/video-call-demo:master && \
          rm -Rf dist.zip && rm -Rf dist && rm -Rf Dockerfile"

rm -Rf dist.zip
