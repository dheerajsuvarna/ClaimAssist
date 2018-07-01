const express = require('express');
const path = require('path');
const passport = require('passport');



const driver = require('bigchaindb-driver')



// Routes
var routerBd = express.Router();
let conn = new driver.Connection('https://test.bigchaindb.com/api/v1/', {
    app_id: 'ec9d000f',
    app_key: '102812bb5673c0730af91bf67447d8ed'
})
const insuranceAgent = new driver.Ed25519Keypair()
//Claim assets
const claimData = {
    "id": "123456",
    "customerName": "Jack",
    "ipfsTx": "exampleTxId"
}

//Claim Metadata
// Create Transaction
const txCreateClaim = driver.Transaction.makeCreateTransaction(
    // Asset Data
    claimData,

    // Metadata
    null,

    // Output
    [driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(insuranceAgent.publicKey))],
    insuranceAgent.publicKey
);
//Signature
const txSigned = driver.Transaction.signTransaction(txCreateClaim, insuranceAgent.privateKey);



routerBd.get('/search/:word', function (req, res) {
    console.log("API Working")
    var word = req.params.word;
    conn.searchAssets(word)
        .then(function (assets) {
            if (assets == null) {
                res.send("NO RESULT FOUND")
            } else {
                res.send(JSON.stringify(assets))
            }

        });
});

routerBd.get('/testBigchain', function (req, res) {
    conn.postTransactionCommit(txSigned).then(function (data) {
        res.send(JSON.stringify(data))
    })
});
module.exports = routerBd;

//search asset
// conn.searchAssets('insuranceAgent')
//   .then(assets => console.log(assets));