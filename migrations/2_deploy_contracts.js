var StorageContract = artifacts.require("./claimAssist/ClaimStorage.sol");
var ClaimContract = artifacts.require("./claimAssist/Claim.sol");
var AgreementContract = artifacts.require("./claimAssist/AgreementContract.sol");
var PoliceContract = artifacts.require("./claimAssist/PoliceContract.sol");
var HospitalContract = artifacts.require("./claimAssist/HospitalContract.sol");
var ManagerContract = artifacts.require("./claimAssist/ClaimManager.sol");
var ClaimContract_address = '0x3354088d100859e1ab2f0549a943216cfb4c213a'
module.exports = function() {

  async function getClaim() {
    let ins = await contract.at(ClaimContract_address);
    let res = await ins.getBigchainHash("0x81234");
    console.log('Hash of Bigchain transactions '+res.toString());
  }
  getClaim();


  // deployer.deploy(StorageContract);
  // deployer.deploy(ClaimContract);
  // deployer.deploy(ManagerContract);
  // deployer.deploy(AgreementContract);
  // deployer.deploy(PoliceContract);
  // deployer.deploy(HospitalContract);
}
