FROM node:8.11.2

EXPOSE 1337
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install && npm cache clean --force
RUN npm install sails && npm install nodemon -g
COPY . .
CMD ["nodemon","./app.js"]


