# back-end-ir

a [Sails v1](https://sailsjs.com) application




### Version info

Versión final del sistema.

## Funcionamineto

+ nvm use 8
+ nodemon app.js

## Bibliotecas
+ sudo npm install sails-inverse-model
+ npm i --save bcrypt-nodejs
+ npm i --save passport
+ npm i --save passport-local
+ npm i --save jsonwebtoken
+ npm install mocha --save-dev
+ npm install supertest --save-dev
+ npm install passport-jwt
+ npm install sails-service-cipher
+ npm i Atlantis-Software/waterline#deepPopulate (https://github.com/emahuni/sails-hook-deep-orm)

#Base de datos
sails-inverse-model -u root -p 'gjwQbdRD4ktt' -d inventarioReal -m -c

#Docker
Connect terminal docker exec -ti 8b15d2843835680f3a84f3e10cbeda39afc50ce45853fd9b83684054df2e105b bash

#Query logs
set DEBUG=query & node app.js

