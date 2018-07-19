pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/claimAssist/Claim.sol";

contract TestClaim {
  Claim claim = Claim(DeployedAddresses.Claim());
  bytes  expected = "0x222222222";
  function testAdopt() {
    
    claim.addClaim("0x1234","0x222222222");
    bytes memory hashValue = claim.getBigchainHash("0x1234");
    Assert.equal(hashValue, expected, "Getting the right Bigchain Hash");
  }

  // function testGetOwner() {
  //   // this is a contract-wide variable that returns the current contract's address
  //   address expected = this; 
    
  //   address adopter = adoption.adopters(8);
  //   Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
  // }

  // function testGetAdopters() {
  //   address expected = this;

  //   // memory attribute tells Solidity to temporarily store the value in memory,
  //   // rather than saving it to the contract's storage
  //   address[16] memory adopters = adoption.getAdopters();
    
  //   Assert.equal(adopters[8], expected, "Owner of pet ID should be recorded.");
  // }
}