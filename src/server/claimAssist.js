const express = require('express');
const path = require('path');
const passport = require('passport');
const ipfs = require('./ipfs')
const bcdb = require('./bigchain')
var routerClaimAssist = express.Router();

routerClaimAssist.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/login.html'));
});

routerClaimAssist.post('/saveClaim', function(req, res) {
    let claimDetails = req.body.claimObject;
    console.log("Claim Details", claimDetails)
    ipfs.store(claimDetails)
    .then(function(ipfs_hash){
        return bcdb.saveHashToBCDB(ipfs_hash)
    }).then(function(bcdb_txid){
        res.send(bcdb_txid)
    }).catch(function(error){
        console.log("There is an error ===> " + error.stack)
    })

});


routerClaimAssist.get('/getFile/:bcdb_txid', function(req, res) {
    let bcdb_txid = req.params.bcdb_txid;
    bcdb.getIPFSHash(bcdb_txid)
        .then(function(ipfsHash) {
            return ipfs.getFile(ipfsHash)
        }).then(function(content_json) {
            // Decrypt the File
            res.send(content_json)
        }).catch(function(error) {
            console.log("There is an error ===> " + error.stack)
        })

});

routerClaimAssist.get('/showAgreement', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/SecondParty.html'));
});

/* ========================================== Login page ========================================================*/
routerClaimAssist.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/login.html'));
});

routerClaimAssist.get('/loginAccount/:role', function(req, res) {
    let role = req.params.role;
    if(role == 'policyHolder'){
        res.redirect('/policyHolder');
    }else if(role == 'admin'){
        res.redirect('/admin');
    }else if(role == 'police'){
        res.redirect('/police');
    }else if(role == 'hospital'){
        res.redirect('/hospital');
    }else{
        res.redirect('/');
    }
});

routerClaimAssist.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/login.html#signup'));
});

/* ========================================== Policy Holder Routes ========================================================*/
routerClaimAssist.get('/policyHolder', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/PolicyHolder_index.html'));
});


routerClaimAssist.get('/policyHolderClaimStatus', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/PolicyHolder_claimstatus.html'));
});

routerClaimAssist.get('/policyHolderNotifications', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/PolicyHolder_notifications.html'));
});

routerClaimAssist.get('/policyHolderForm', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/PolicyHolderForm.html'));
});

/* ========================================== Police Routes ========================================================*/


routerClaimAssist.get('/police', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Police_index.html'));
});

routerClaimAssist.get('/policeClaimHistory', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Police_ClaimHistory.html'));
});

routerClaimAssist.get('/policeNotifications', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Police_notifications.html'));
});

routerClaimAssist.get('/policePendingClaims', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Police_PendingClaims.html'));
});

routerClaimAssist.get('/policeForm', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/PoliceForm.html'));
});



/* ========================================== Hospital Routes ========================================================*/



routerClaimAssist.get('/hospital', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Hospital_index.html'));
});

routerClaimAssist.get('/hospitalClaimHistory', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Hosp_claimhistory.html'));
});

routerClaimAssist.get('/hospitalNotifications', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Hosp_notifications.html'));
});

routerClaimAssist.get('/hospitalPendingClaims', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Hosp_pendingClaims.html'));
});

routerClaimAssist.get('/hospitalForm', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/HospForm.html'));
});

/* ========================================== Other Party Details ========================================================*/

routerClaimAssist.get('/otherParty', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/OtherPartyForm.html'));
});

/* ========================================== Project Details ========================================================*/

routerClaimAssist.get('/projectDetail', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/project_detail.html'));
});

/* ========================================== Claim Status ========================================================*/

routerClaimAssist.get('/claimStatus', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/Claim_status.html'));
});

/* ========================================== Admin ========================================================*/

routerClaimAssist.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/blockinsurance/adminForm.html'));
});

module.exports = routerClaimAssist;