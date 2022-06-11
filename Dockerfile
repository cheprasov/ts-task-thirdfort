# syntax=docker/dockerfile:1

FROM node:16-alpine

WORKDIR /app

COPY ./src /app/src
COPY ./tsconfig.json /app
COPY ./server.ts /app
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm i

EXPOSE 3000

CMD MYSQL_HOST=mysql MYSQL_PORT=3306 npx ts-node ./server.ts