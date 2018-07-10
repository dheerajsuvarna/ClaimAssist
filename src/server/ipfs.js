const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
var defer = require("promise-defer")


var exports = module.exports = {}; 

exports.encryptStringWithRsaPublicKey = function() {
	let obj ={
    "employees": [
        {
            "firstName": "Jeshwanth",
            "lastName": "P"
        },
        {
            "firstName": "Anna",
            "lastName": "Smith"
        },
        {
            "firstName": "Peter",
            "lastName": "Jones"
        }
    ]
}
    var absolutePath = path.resolve('src/server/pub_key.key');
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer.from(JSON.stringify(obj));
    console.log(buffer)
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    console.log(encrypted.toString("base64"));
}


exports.store = function (obj){
    var deferred = defer();
    var buf = Buffer.from(JSON.stringify(obj));
    var hash;
    ipfs.files.add(buf, (error, result) => {
    	    if(error) {  
    	        console.error(error)
    	        deferred.reject(error) ;
    	    }
            deferred.resolve(result[0].hash)
        }); 
   return deferred.promise;
}


