function claim() {
  event.preventDefault();
  console.log("Reached Here")
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
      App.web3Provider = new web3.providers.HttpProvider("http://localhost:9545");
      web3 = new Web3(App.web3Provider);
    }

    return App.initICSContract();
  },

  initICSContract: function () {

    $.getJSON('/public/contracts/ICSContract.json', function (data) {

      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var ICSArtifact = data;

      App.contracts.ICSContract = TruffleContract(ICSArtifact);

      // Set the provider for our contract.
      App.contracts.ICSContract.setProvider(App.web3Provider);

    });
  }


};

$(function () {
  $(window).load(function () {
    App.init();

  });
});
