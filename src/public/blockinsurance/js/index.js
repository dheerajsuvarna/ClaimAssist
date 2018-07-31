function claim() {

  event.preventDefault();
  if(validateForm()){

    var jsondata = {};
    var accidentPhotos;
    // var accident_photos;
    var file = document.getElementById('claim_form').files[0];
    if (file) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
            accidentPhotos = e.target.result;S
        };
    }
    $("input").each(function($i) {
        var name = $(this).attr('name')
        if ($(this).val()) {
            jsondata[name] = $(this).val();
        }
        $("input:radio:checked").each(function($i) {
            var name = $(this).attr('name')
            if ($(this).val()) {
                jsondata[name] = $(this).val();
            }
        });
  
        $("select").each(function($i) {
            var name = $(this).attr('name')
            if ($(this).val()) {
                jsondata[name] = $(this).val();
            }
        });
  
    });
    let policy_no = document.getElementById("policyholder_policy_no").value;
    let claim_id = hash(policy_no);
    $.post("/saveClaim", {
            claimObject: jsondata
        },
        function(result) {
          addClaimOnBlockchain(claim_id, result)
        });
  }
  
}

var App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    console.log("Reaching here")
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

    //addClaimOnBlockchain("0x1231234", "0x999999");
    //getBigchainHash("0x545454");
    //getBigchainHash("0x123123");
    //addSignature("0x123123","0x888888");
    //getSignatures("0x123123");
    //addPolice("0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef");
    //addReportOnBlockchain("0x123123","0x777777");
    //getBigchainHash("0x123123");
    //addHospital("0x821aEa9a577a9b44299B9c15c88cf3087F3b5544");
    //addBillOnBlockchain("0x123123","0x66666");
    //console.log("Hash");
  }

};



var hash = function(s) {
  console.log("Value to hash == > " + s)
  var a = 1, c = 0, h, o;
  if (s) {
      a = 0;
      for (h = s.length - 1; h >= 0; h--) {
          o = s.charCodeAt(h);
          a = (a<<6&268435455) + o + (o<<14);
          c = a & 266338304;
          a = c!==0?a^c>>21:a;
      }
  }
  return String(a);
};

function validateForm() {
  let policy_no =document.getElementById("policyholder_policy_no").value;
  if (policy_no == "") {
      return false;
  }else return true;
}

// $(function () {
//   $(window).load(function () {
//     App.init();

//   });
// });

$( document ).ready(function() {
  App.init();
});