$( document ).ready(function() {
   getClaim(); //Gets the claim and Populates the form
});
var file;
async function getClaim(){
    let claim_id = getAllUrlParams().claim_id;

    //let file = getFile(claim_id);
    file = await getFile(claim_id);
     document.getElementById("claim_id").value = claim_id;
     document.getElementById("otherperson_name").value = file["Policy holder name"];
     document.getElementById("accident_place").value = file["Accident place"];
     document.getElementById("Accident_datetime").value = file["Accident_datetime"];
     document.getElementById("accident_country").value = file["Accident country"];
     document.getElementById("reporting_authority").value = file["Reporting authority"];
     document.getElementById("accident_injury").value = file["Injury"];
     document.getElementById("material_damage").value = file["Material damage"];
     document.getElementById("policy_holder_remarks").value = file["policy_holder_remarks"];
     document.getElementById("responsible_party").value = file["Responsible party"];
}
function signAgreement(){
  event.preventDefault();
    console.log("FILE contents " + JSON.stringify(file))
    file["Agreement"] = $("#agreement").val();
    file["Verification remarks"] = $("#verification_remarks").val();
    $.post("/saveClaim", {
        claimObject: file
    },
    function(newBCDBTxId) {
        console.log("New bigchain Hash" + JSON.stringify(newBCDBTxId))
        addSignature(claim_id, newBCDBTxId);
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