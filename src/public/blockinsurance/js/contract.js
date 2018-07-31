
addClaimOnBlockchain = function(claimId, bigChainHash) {
  // Get the Claim.sol contract artifact file and instantiate it with truffle-contract.
  $.getJSON('/public/contracts/Claim.json', function (ClaimArtifact) {
    App.contracts.ClaimContract = TruffleContract(ClaimArtifact);
    App.contracts.ClaimContract.setProvider(App.web3Provider);
    var ClaimInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }   
      var claimInitiator = accounts[0];
      App.contracts.ClaimContract.deployed().then(function(instance) {
        ClaimInstance = instance;
        return ClaimInstance.addClaim(claimId, bigChainHash ,{from: claimInitiator});
      }).then(function(response) {
        var para = document.createElement("p");
        var node = document.createTextNode("http://localhost:3001/otherParty?claim_id="+claimId);
        para.appendChild(node);
        var element = document.getElementById("successPara");
        document.getElementById("otherPartyLink").href="http://localhost:3001/otherParty?claim_id="+claimId; 
        element.appendChild(para);
        $('#modal').trigger('click');
      }).catch(function(err) {
        console.log(err);
      });
    });

  });

}

function getFile(claimId)  {
  // Since Javascript is asynchronous we had to wrap the Javascript Function in a Promise. And when we call getFile() we make use of Async Await Function
  return new Promise(resolve => {
    $.getJSON('/public/contracts/Claim.json', function (data) {
      var ClaimArtifact = data;
      var ClaimInstance;
      App.contracts.ClaimContract = TruffleContract(ClaimArtifact);
      App.contracts.ClaimContract.setProvider(App.web3Provider);
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        App.contracts.ClaimContract.deployed().then(function(instance) {
          ClaimInstance = instance;
          return ClaimInstance.getBigchainHash.call(claimId);
        }).then(function(hash) {
          $.get("/getFile/"+hash,
           function(result) {
             resolve(JSON.parse(result));
        });
        }).catch(function(err) {
          console.log(err.message);
        });
      });
    });
  });
  
}

addSignature = function(claimId, newBigChainHash) {

  $.getJSON('/public/contracts/AgreementContract.json', function (data) {

    var AgreementArtifact = data;
    var AgreementInstance;
    App.contracts.AgreementContract = TruffleContract(AgreementArtifact);
    App.contracts.AgreementContract.setProvider(App.web3Provider);


    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var otherParty = accounts[1];
      App.contracts.AgreementContract.deployed().then(function(instance) {
        AgreementInstance = instance;
        return AgreementInstance.signDocument(claimId, newBigChainHash ,{from: otherParty});
      }).then(function(response) {
        console.log("Signing successful!");
        console.log("Signature added to claim with id: " + claimId);
      }).catch(function(err) {
        console.log(err.message);
      });
    });

  });

}

getSignatures = function(claimId) {

  $.getJSON('/public/contracts/AgreementContract.json', function (data) {

    var AgreementArtifact = data;
    var AgreementInstance;
    App.contracts.AgreementContract = TruffleContract(AgreementArtifact);
    App.contracts.AgreementContract.setProvider(App.web3Provider);

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.AgreementContract.deployed().then(function(instance) {
        AgreementInstance = instance;
        return AgreementInstance.getSignatures.call(claimId);
      }).then(function(signature) {
        console.log("Signatures ====> " + signature);
      }).catch(function(err) {
        console.log(err.message);
      });
    });

  });
}

addReportOnBlockchain = function(claimId, newbigChainHash) {

  $.getJSON('/public/contracts/PoliceContract.json', function (data) {

    var PoliceArtifact = data;
    var PoliceInstance;
    App.contracts.PoliceContract = TruffleContract(PoliceArtifact);
    App.contracts.PoliceContract.setProvider(App.web3Provider);

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var Police = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";
      App.contracts.PoliceContract.deployed().then(function(instance) {
        PoliceInstance = instance;
        return PoliceInstance.addPoliceReport(claimId, newbigChainHash,{from: Police});
      }).then(function(response) {
        console.log("Police report added to claim ID: " + claimId);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  });
}

addPolice = function(_newPoliceAddress) {

  $.getJSON('/public/contracts/ClaimManager.json', function (data) {

    var ManagerArtifact = data;
    var ManagerInstance;
    App.contracts.ManagerContract = TruffleContract(ManagerArtifact);
    App.contracts.ManagerContract.setProvider(App.web3Provider);

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      console.log(accounts);
      App.contracts.ManagerContract.deployed().then(function(instance) {
        ManagerInstance = instance;
        return ManagerInstance.addPoliceToRegistry(_newPoliceAddress);
      }).then(function(response) {
        console.log("Police added having address ====> " + _newPoliceAddress);
      }).catch(function(err) {
        console.log(err.message);
      });
    });

  });

}

addBillOnBlockchain = function(claimId, newbigChainHash) {

  $.getJSON('/public/contracts/HospitalContract.json', function (data) {

    var HospitalArtifact = data;
    var HospitalInstance;
    App.contracts.HospitalContract = TruffleContract(HospitalArtifact);
    App.contracts.HospitalContract.setProvider(App.web3Provider);

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var Hospital = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544";
      App.contracts.HospitalContract.deployed().then(function(instance) {
        HospitalInstance = instance;
        return HospitalInstance.addHospitalBill(claimId, newbigChainHash,{from: Hospital});
      }).then(function(response) {
        console.log("Hospital bill added to claim ID: " + claimId);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  });
}

addHospital = function(_newHospitalAddress) {

  $.getJSON('/public/contracts/ClaimManager.json', function (data) {

    var ManagerArtifact = data;
    var ManagerInstance;
    App.contracts.ManagerContract = TruffleContract(ManagerArtifact);
    App.contracts.ManagerContract.setProvider(App.web3Provider);

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      console.log(accounts);
      App.contracts.ManagerContract.deployed().then(function(instance) {
        ManagerInstance = instance;
        return ManagerInstance.addHospitalToRegistry(_newHospitalAddress);
      }).then(function(response) {
        console.log("Hospital added having address ====> " + _newHospitalAddress);
      }).catch(function(err) {
        console.log(err.message);
      });
    });

  });
}
