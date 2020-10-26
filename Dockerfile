FROM node:12

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --only=production

COPY server.js server.js
COPY build build

EXPOSE 8080
CMD [ "node", "server.js" ]
