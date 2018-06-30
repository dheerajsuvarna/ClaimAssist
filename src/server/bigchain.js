
const express = require('express');
const path = require('path');
const passport = require('passport');



const driver = require('bigchaindb-driver')



//}

var routerBd = express.Router();
routerBd.get('/testBigchain', function (req, res) {

  console.log("Reaching till here")
  let bdb = new driver.Connection('https://test.bigchaindb.com/api/v1/', {
      app_id: 'ec9d000f',
      app_key: '102812bb5673c0730af91bf67447d8ed'
  })
  
  const insuranceAgent = new driver.Ed25519Keypair()
  //Claim assets
  const claimData = {
  	"id": "123456",
    "customerName" : "Jack",
    "ipfsTx" : "exampleTxId"
  }

  //Claim Metadata
      // Create Transaction
      const txCreateClaim = driver.Transaction.makeCreateTransaction(
          // Asset Data
          claimData,

          // Metadata
          null,

          // Output
          [ driver.Transaction.makeOutput(
                  driver.Transaction.makeEd25519Condition(insuranceAgent.publicKey))
          ],
          insuranceAgent.publicKey
      );

      //Signature
      const txSigned = driver.Transaction.signTransaction(txCreateClaim, insuranceAgent.privateKey);
      console.log("bdb ====> " + JSON.stringify(bdb) )
      // console.log("txCreateClaim ====> " +JSON.stringify(txCreateClaim) )
      //   console.log("insuranceAgent ====> " + JSON.stringify(insuranceAgent) )
      //     console.log("claimData ====> " + JSON.stringify(claimData) )
      // Send Transaction
      bdb.postTransactionCommit(txSigned)
      	.then(retrievedTx => {
      	     console.log('Transaction', retrievedTx.id, 'successfully posted.');
      	 }).catch(function(error){
           console.log("Error ======> "+ error)
         })
});
module.exports = routerBd;

//search asset
// conn.searchAssets('insuranceAgent')
//   .then(assets => console.log(assets));
