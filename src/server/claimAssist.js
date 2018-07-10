const express = require('express');
const path = require('path');
const passport = require('passport');
const ipfs = require('./ipfs')
const bcdb = require('./bigchain')
var routerClaimAssist = express.Router();

routerClaimAssist.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/blockinsurance/userView.html'));
});

routerClaimAssist.post('/saveClaim', function (req, res) {
    let claimDetails = req.body.claimObject;
    ipfs.store(claimDetails)
    .then(function(ipfs_hash){
       return bcdb.saveHashToBCDB(ipfs_hash);
    }).then(function(bcdb_txid){
        res.send(bcdb_txid)
    }).catch(function(error){
        console.log("There is an error ===> " + error.stack)
    })
    
});

routerClaimAssist.get('/showAgreement', function (req, res) {
	
});

routerClaimAssist.post('/signAgreement', function (req, res) {
	
});

routerClaimAssist.get('/policeReport', function (req, res) {
	
});

routerClaimAssist.post('/policeReport', function (req, res) {
	
});

routerClaimAssist.get('/hospitalReport', function (req, res) {
	
});

routerClaimAssist.post('/hospitalReport', function (req, res) {
	
});

routerClaimAssist.get('/petshop', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/petshop/index.html'));
});


routerClaimAssist.get('/petshop', function (req, res) {
	res.sendFile(path.join(__dirname + '/../public/petshop/index.html'));
});

module.exports = routerClaimAssist;