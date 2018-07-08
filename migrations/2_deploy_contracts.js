var Adoption = artifacts.require("./Adoption.sol");

var AgreementContract = artifacts.require("./AgreementContract.sol");
var PoliceContract = artifacts.require("./PoliceContract.sol");
var HospitalContract = artifacts.require("./HospitalContract.sol");
var ICSContract = artifacts.require("./ICSContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  
  deployer.deploy(AgreementContract);
  deployer.deploy(PoliceContract);
  deployer.deploy(HospitalContract);
  deployer.deploy(ICSContract);
}
