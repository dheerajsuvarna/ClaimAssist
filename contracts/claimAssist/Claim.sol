pragma solidity ^0.4.4;

import "./ClaimStorage.sol";

contract Claim{

    ClaimStorage claimStorage = ClaimStorage(0x2e335f247e91caa168c64b63104c4475b2af3942); // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

    event ClaimStatus(
        address indexed _from,
        string _claimid,
        string _claimstatus
    );

    function addClaim(string claimId, string _bigchainHash) public {
       claimStorage.setClaim(claimId, _bigchainHash, msg.sender);
       emit ClaimStatus(msg.sender, claimId, claimStorage.getClaimStatus(claimId));
    }

    function getBigchainHash(string _claimId) public view returns (string) {
        return claimStorage.getBigchainHash(_claimId);
    }

}
