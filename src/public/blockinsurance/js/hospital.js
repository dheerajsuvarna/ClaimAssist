$( document ).ready(function() {
    listenToAgreement();
    getClaim();
 });

// This function will continuously listen to new Claims, which have been signed by both parties.
 function listenToAgreement(){
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
            var event = AgreementInstance.AgreementStatus();
            event.watch(function(error, result){
                console.log(result.args);
                console.log(JSON.stringify(result.args));
              });
          }).catch(function(err) {
            console.log(err.message);
          });
        });
    
      });
  }
 var file;

 async function getClaim(){
     let claim_id = getAllUrlParams().claim_id;
 
     //let file = getFile(claim_id);
     file = await getFile(claim_id);
     
 }
 
 function submitHospitalBill(){
   event.preventDefault();
     let claim_id = getAllUrlParams().claim_id;
     file["hospital_name"] = $("#hospital_name").val();
     file["doctor_name"] = $("#doctor_name").val();
     file["hospital_telephone"] = $("#hospital_telephone").val();
     file["hospital_country"] = $("#hospital_country").val();
     file["hospital_case_id"] = $("#case_id").val();
     file["patient_name"] = $("#patient_name").val()
     file["hospital_bills"] = $("#hospital_bills").val();
     $.post("/saveClaim", {
         claimObject: file
     },
     function(newBCDBTxId) {
        addBillOnBlockchain(claim_id, newBCDBTxId);
     });
 }
 
 function getAllUrlParams(url) {
     var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
     var obj = {};
     if (queryString) {
       queryString = queryString.split('#')[0];
       var arr = queryString.split('&');
       for (var i=0; i<arr.length; i++) {
         var a = arr[i].split('=');
         var paramNum = undefined;
         var paramName = a[0].replace(/\[\d*\]/, function(v) {
           paramNum = v.slice(1,-1);
           return '';
         });
         var paramValue = typeof(a[1])==='undefined' ? true : a[1];
         paramName = paramName.toLowerCase();
         paramValue = paramValue.toLowerCase();
         if (obj[paramName]) {
           if (typeof obj[paramName] === 'string') {
             obj[paramName] = [obj[paramName]];
           }
           if (typeof paramNum === 'undefined') {
             obj[paramName].push(paramValue);
           }
           else {
             obj[paramName][paramNum] = paramValue;
           }
         }
         else {
           obj[paramName] = paramValue;
         }
       }
     }
   
     return obj;
   }