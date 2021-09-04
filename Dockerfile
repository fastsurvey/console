FROM node:12

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

EXPOSE 8080

COPY . .
RUN yarn build

CMD [ "node", "server.js" ]
