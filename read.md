
Alqamus App

This is a start-up project
in the application we use express framework application recommendation with sequelizer
framework for database connection with MySQL database we use the best practises library for
user authentication (passport-local) strategy witch can easily upgrade for Oauth authentication
 for Facebook and twitter and other services too for set up login and logout user with
 session security(persist the state of the established connection across multiple request-response cycles).
this application need more work to the security layer but we will work on it later as project progress.
we need to start the front-end layer so we can judge and simulate the locale cookies needed for the security layer.
we will need testing framework for the project later.


as many express application we use familiar structure for express programmer.

|----bin

|-------------- www start the server

|----config

|---------------config.json  //for setup your database connection

|---------------passport.js   //setup passport functions

|----models

|---------------index.js //setup sequelizer framework and models folder to all models inside the folder

|---------------user.js  //user database table model

|----public //static files javascript and css and html files for the project

|----routes

|---------------index.js  //setup router for rest service as rest endpoint

|---------------user.js   //router for the user model

|app.js    //it is the main express framework file





to setup project

go to project folder

npm install

cd bin

node www

http://localhost:3000/

