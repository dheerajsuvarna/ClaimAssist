pragma solidity ^0.4.4;

import "./ClaimStorage.sol";

contract Claim{

    ClaimStorage claimStorage = ClaimStorage(0xbde95422681e4c3984635af2f2f35f8c44a4ddc9);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

    function addClaim(string claimId, string _bigchainHash) public {
       claimStorage.setClaim(claimId, _bigchainHash, msg.sender);
    }

    function getBigchainHash(string _claimId) public view returns (string) {
        return claimStorage.getBigchainHash(_claimId);
    }



}
