pragma solidity ^0.4.4;

import "./ClaimStorage.sol";

contract Claim{

    ClaimStorage claimStorage = ClaimStorage(0x4e71920b7330515faf5ea0c690f1ad06a85fb60c);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

    function addClaim(string claimId, string _bigchainHash) public {
       claimStorage.setClaim(claimId, _bigchainHash, msg.sender);
    }

    function getBigchainHash(string _claimId) public view returns (string) {
        return claimStorage.getBigchainHash(_claimId);
    }



}
