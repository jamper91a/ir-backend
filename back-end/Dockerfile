#FROM node .8.11.2
FROM jamper91/back-end

EXPOSE 1337
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#COPY package.json package.json
#RUN npm install && npm cache clean --force
##RUN npm install sails && npm install nodemon -g
#COPY . ./back-end/api/
#COPY . ./back-end/config/
#COPY . ./back-end/task/
#COPY . ./back-end/app.js
#COPY . ./back-end/Gruntfile.js
#COPY . ./back-end/package.json
#COPY . ./back-end/package-lock.json
CMD ["node","./app.js"]


