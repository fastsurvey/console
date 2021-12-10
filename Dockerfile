FROM node:12 as build
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY server.js server.js
RUN yarn install --production=true
COPY dist dist

FROM gcr.io/distroless/nodejs
COPY --from=build /app /
EXPOSE 8080
CMD ["server.js"]