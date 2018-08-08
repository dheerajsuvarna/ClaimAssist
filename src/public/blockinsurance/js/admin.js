$( document ).ready(function() {
    getAccountsAndPopulate();
 });

// This function will continuously listen to new Claims, which have been signed by both parties.
 function getAccountsAndPopulate(){
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
         console.log("Accounts", accounts)
      });
  }

  function addPoliceAddress(){
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
         addPolice(accounts[0]);
      });
  }

  function addHospitalAddress(){
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
         addHospital(accounts[0])
      });
  }