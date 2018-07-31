const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
const encrypt_decrypt = require('./encrypt_decrypt')
var defer = require("promise-defer");

var exports = module.exports = {};

exports.store = function (obj){
    var deferred = defer();
    var buf = Buffer.from(JSON.stringify(obj));
    encrypt_decrypt.encrypt(buf)
    .then(function(data){
			console.log("Before IPFS  " + data)
       return  ipfs.files.add(data)
    }).then(function(result){
			console.log("Reached IPFS "+ result[0].hash )
        deferred.resolve(result[0].hash)
    }).catch(function(error){
        deferred.reject(error) ;
    });
   return deferred.promise;
}

exports.getFile = function (hash){
    var deferred = defer();
    ipfs.files.get(hash)
    .then(function(data){
        return  encrypt_decrypt.decrypt(data[0].content)
         }).then(function(decrypted_data){
        deferred.resolve(decrypted_data)
    }).catch(function(error){
        deferred.reject(error) ;
    });
   return deferred.promise;
}
