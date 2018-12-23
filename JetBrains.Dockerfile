# Created by IntelliJ IDEA
FROM jamper91/back-end:latest
WORKDIR /usr/src/app
#COPY package.json /tmp/project_modules/package.json
#RUN npm install .

CMD ["node","./app.js"]
