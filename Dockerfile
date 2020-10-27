FROM node:12

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production=true

COPY server.js server.js
COPY build build

EXPOSE 8080
CMD [ "node", "server.js" ]
