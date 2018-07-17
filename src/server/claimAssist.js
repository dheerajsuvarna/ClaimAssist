const express = require('express');
const path = require('path');
const passport = require('passport');
const ipfs = require('./ipfs')
const bcdb = require('./bigchain')
var routerClaimAssist = express.Router();

routerClaimAssist.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/blockinsurance/PolicyHolderForm.html'));
});

routerClaimAssist.post('/saveClaim', function (req, res) {
		console.log("hello ficker")
    let claimDetails = req.body.claimObject;
    ipfs.store(claimDetails)
    //call encryption function
    .then(function(ipfs_hash){
        return bcdb.saveHashToBCDB(ipfs_hash)
				console.log(ipfs_hash)
    }).then(function(bcdb_txid){
			console.log(bcdb_txid)
        res.send(bcdb_txid)
    }).catch(function(error){
        console.log("There is an error ===> " + error.stack)
    })

});


routerClaimAssist.get('/getFile/:bcdb_txid', function (req, res) {
    let bcdb_txid = req.params.bcdb_txid;
    bcdb.getIPFSHash(bcdb_txid)
    .then(function(ipfsHash){
        return ipfs.getFile(ipfsHash)
    }).then(function(content_json){
        // Decrypt the File
        res.send(content_json )
    }).catch(function(error){
        console.log("There is an error ===> " + error.stack)
    })

});

routerClaimAssist.get('/showAgreement', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/blockinsurance/SecondParty.html'));
});

routerClaimAssist.get('/police', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/blockinsurance/Police.html'));
});

routerClaimAssist.get('/hospital', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/blockinsurance/Hospital.html'));
});

routerClaimAssist.get('/petshop', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/petshop/index.html'));
});


routerClaimAssist.get('/petshop', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/petshop/index.html'));
});

module.exports = routerClaimAssist;
