FROM node:16-alpine

WORKDIR /app

ARG HOST_API

ENV HOST_API=$HOST_API

COPY package*.json ./
RUN npm install

COPY . .

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=9000

RUN npm run build

CMD ["npm","run","start"]