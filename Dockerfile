FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build:ssr

EXPOSE 4200

CMD ["pm2-runtime", "start", "node dist/blog/server/main.js"]