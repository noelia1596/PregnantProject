const dbProps = require('./settings').db;
//require mongoose module
var mongoose = require('mongoose');

//require database URL from properties file
var dbURL = `mongodb://${dbProps.host}:${dbProps.port}/${dbProps.db}`;
if (dbProps.username) {
  dbURL = `mongodb://${dbProps.user}:${dbProps.pass}@${dbProps.host}:${dbProps.port}/${dbProps.db}`
}
console.log("dbURL is: " + dbURL);
//export this function and imported by server.js
module.exports = function(){
  mongoose.connect(dbURL, { useNewUrlParser: true });
  mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open to ", dbURL);
  });
  mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
  });
  mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
  });
  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination");
      process.exit(0)
    });
  });
}