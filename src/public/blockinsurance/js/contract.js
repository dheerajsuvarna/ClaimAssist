
contracts.addClaimOnBlockchain = function(claimId, bigChainHash) {

  var ICSInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var claimInitiator = accounts[0];
    App.contracts.ICSContract.deployed().then(function(instance) {
      ICSInstance = instance;
      var timeStamp = Date.now();
      return ICSInstance.addClaim(claimId, bigChainHash,timeStamp ,{from: claimInitiator});
    }).then(function(claimId) {
      console.log(claimId);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

contracts.addSignature = function(claimId, newBigChainHash) {

  var ICSInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var otherParty = accounts[1];
    App.contracts.ICSContract.deployed().then(function(instance) {
      ICSInstance = instance;
      var timeStamp = Date.now();
      return ICSInstance.signDocument(claimId,newBigChainHash {from: otherParty});
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

contracts.getBigchainHash = function(claimId) {

  var ICSInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var otherParty = accounts[1];
    //"0x103023a944eb6c7f575df911f767bc363bc1b85ff0f1bc88834d7b18d4023b79"
    App.contracts.ICSContract.deployed().then(function(instance) {
      ICSInstance = instance;
      return ICSInstance.getBigchainHash(claimId).call();
    }).then(function(hash) {
      console.log(hash);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

contracts.addReportOnBlockchain = function(claimId, bigChainHash) {

  var ICSInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var Police = accounts[2];
    App.contracts.ICSContract.deployed().then(function(instance) {
      ICSInstance = instance;
      var timeStamp = Date.now();
      return ICSInstance.addPoliceReport(claimId, bigChainHash, {from: Police});
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

contracts.addPolice = function(policeAddress) {

  var ICSInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var admin = accounts[4];
    App.contracts.ICSContract.deployed().then(function(instance) {
      ICSInstance = instance;
      return ICSInstance.addPoliceAddress(policeAddress, {from: admin});
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

contracts.addBillOnBlockchain = function(claimId, bigChainHash) {

  var ICSInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var Hospital = accounts[5];
    App.contracts.ICSContract.deployed().then(function(instance) {
      ICSInstance = instance;
      return ICSInstance.addHospitalBill(claimId, bigChainHash, {from: Hospital});
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

contracts.addHospital = function(hospitalAddress) {

  var ICSInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    var admin = accounts[4];
    App.contracts.ICSContract.deployed().then(function(instance) {
      ICSInstance = instance;
      return ICSInstance.addHospitalAddress(hospitalAddress ,{from: admin});
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err.message);
    });
  });
}

var contracts = module.exports = {};
