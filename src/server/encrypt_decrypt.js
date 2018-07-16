// Part of https://github.com/chris-rock/node-crypto-examples

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq',
    defer = require("promise-defer");


var exports = module.exports = {};

exports.encrypt = function (buffer){
  var deferred = defer();
  var cipher = crypto.createCipher(algorithm,password)
  console.log("Reached Encryption")
  var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
  deferred.resolve(crypted);
  return deferred.promise;
}

exports.decrypt = function(buffer){
	 var deferred = defer();
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
  deferred.resolve(dec);
  return deferred.promise;
}
