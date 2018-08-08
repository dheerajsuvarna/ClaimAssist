const express = require('express');
const path = require('path');
const passport = require('passport');
const defer = require("promise-defer")
const driver = require('bigchaindb-driver')



// Routes
var exports = module.exports = {}; 
let conn = new driver.Connection('https://test.bigchaindb.com/api/v1/', {
    app_id: 'ec9d000f',
    app_key: '102812bb5673c0730af91bf67447d8ed'
})




const insuranceAgent = new driver.Ed25519Keypair()
exports.saveHashToBCDB = function(hash){
    var deferred = defer();
    const txCreateClaim = driver.Transaction.makeCreateTransaction(
        // Asset Data
       {"hash" : hash},
    
        // Metadata
        null,
    
        // Output
        [driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(insuranceAgent.publicKey))],
        insuranceAgent.publicKey
    );
    const txSigned = driver.Transaction.signTransaction(txCreateClaim, insuranceAgent.privateKey);
    conn.postTransactionCommit(txSigned).then(function (data) {
        deferred.resolve(data.id)
    }).catch(function(error){
        deferred.resolve(error)
    })
    return deferred.promise;
} 


//search for IPFS hash in BigchainDB
exports.getIPFSHash = function(bcdb_txid){
    var deferred = defer();
    conn.searchAssets(bcdb_txid)
    .then(function(asset){
        deferred.resolve(asset[0].data.hash)
    }).catch(function(error){
        deferred.resolve(error)
    })
    return deferred.promise;
}
