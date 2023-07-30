FROM node:14-alpine as build-stage
WORKDIR /app

COPY ./package.json ./package.json

ENV NODE_OPTIONS="--max-old-space-size=4096"

ARG ORIGIN
ENV ORIGIN=${ORIGIN}

RUN npm install

COPY ./public ./public
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./nginx.conf ./nginx.conf

RUN npm run build

FROM nginx:stable-alpine-slim

RUN rm /etc/nginx/conf.d/*
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD nginx -g 'daemon off;'