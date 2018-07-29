function claim() {
  event.preventDefault();
  var buttonValue = {};
  $("input").each(function ($i) {
    var name = $(this).attr('name')
    if ($(this).val()) {
      buttonValue[name] = $(this).val();
    }
    var e = document.getElementById("acc_country");
    var strCountry = e.options[e.selectedIndex].value;
    buttonValue['acc_country'] = strCountry;
  });
  //Make the POST call to save the claim on IPFS and get back Bigchain hash
  $.post("/saveClaim", {
    claimObject: buttonValue
  }, function (result) {
    console.log("hash ====> " + result)
    //Save this hash on Smart Contract
    window.location.replace("http://localhost:3001/showAgreement");
  });
}



var App = {
  web3Provider: null,
  contracts: {},




  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    // metamask and mist inject their own web3 instances, so just
    // set the provider if it exists
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new web3.providers.HttpProvider("https://rinkeby.infura.io/eqWL8Q6R8MZLGS1XF0z5");
      web3 = new Web3(App.web3Provider);
    }
    console.log("Init WEB3")
    return App.initICSContract();
  },

  initICSContract: function () {
   
    $.getJSON('/public/contracts/Claim.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var ClaimArtifact = data;
      App.contracts.ClaimContract = TruffleContract(ClaimArtifact);
      // Set the provider for our contract.
      App.contracts.ClaimContract.setProvider(App.web3Provider);
      addClaimOnBlockchain("0x2222","0x123456789");

  
      // web3.eth.getAccounts(function(error, accounts) {
      //   if (error) {
      //     console.log(error);
      //   }
      //   var claimInitiator = accounts[0];
      //   console.log("Inside web3")
      //   App.contracts.ClaimContract.deployed().then(function(instance) {
      //     console.log("inside deployed")
      //     ClaimInstance = instance;
      //     return ClaimInstance.addClaim("0x545454", 0x234455234 ,{from: claimInitiator});
      //   }).then(function(response) {
      //     console.log("Inside this");
      //     console.log(response);
      //   }).catch(function(err) {
      //     console.log(err.message);
      //   });
      // });
    });
  }


};

$(function () {
  $(window).load(function () {
    App.init();

  });
});