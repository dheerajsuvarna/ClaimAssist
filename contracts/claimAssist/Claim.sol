pragma solidity ^0.4.4;

import "./ClaimStorage.sol";


contract Claim{
    
    ClaimStorage claimStorage = ClaimStorage(0x03c0026656a617e9673046f1693c12d72863a435);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained
    bytes hash;
  
    function addClaim( bytes32 claimId, bytes _bigchainHash) public {
       claimStorage.setClaim(claimId, _bigchainHash, msg.sender);
    }

    function getBigchainHash(bytes32 _claimId) public view returns (bytes) {
        return claimStorage.getBigchainHash(_claimId);
        
    }



}
