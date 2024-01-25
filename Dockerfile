FROM node:18.16.0-alpine3.17

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install express --save

EXPOSE 3000

CMD ["npm", "start"]
