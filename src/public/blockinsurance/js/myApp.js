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
    // var strCountry = e.options[e.selectedIndex].value;
    // buttonValue['acc_country'] = strCountry;
  });
  //Make the POST call to save the claim on IPFS and get back Bigchain hash
  $.post("/saveClaim", {
    claimObject: buttonValue
  }, function (result) {
    console.log("hash ====> " + result)
    //Save this hash on Smart Contract
    window.location.replace("http://localhost:3001/showAgreement");
  });

    // e.preventDefault();
    //
    //   var jsondata = {};
    //   alert("Data")
    //   $("input").each(function($i) {
    //       var name = $(this).attr('name')
    //       if ($(this).val()) {
    //           jsondata[name] = $(this).val();
    //       }
    //       $("input:radio:checked").each(function($i) {
    //           var name = $(this).attr('name')
    //           if ($(this).val()) {
    //               jsondata[name] = $(this).val();
    //           }
    //       });
    //
    //       $("select").each(function($i) {
    //           var name = $(this).attr('name')
    //           if ($(this).val()) {
    //               jsondata[name] = $(this).val();
    //           }
    //       });
    //
    //   });
      // $.post("/saveClaim", {
      //         claimObject: jsondata
      //     },
      //     function(result) {
      //         console.log("hash ====> " + result)
      //     });
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
    console.log("Init WEB3")
    return App.callContracts();
  },

  callContracts: function () {

    //addClaimOnBlockchain("0x123123", "0x999999");
    //getBigchainHash("0x545454");
    //getBigchainHash("0x123123");
    //addSignature("0x123123","0x888888");
    //getSignatures("0x123123");
    //addPolice("0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef");
    //addReportOnBlockchain("0x123123","0x777777");
    //getBigchainHash("0x123123");
    //addHospital("0x821aEa9a577a9b44299B9c15c88cf3087F3b5544");
    //addBillOnBlockchain("0x123123","0x66666");
    getBigchainHash("0x123123");
  }

};

$(function () {
  $(window).load(function () {
    App.init();

  });
});
