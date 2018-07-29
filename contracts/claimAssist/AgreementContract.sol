pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";


contract AgreementContract {

    ClaimStorage claimStorage = ClaimStorage(0x2467636bea0f3c2441227eedbffac59f11d54a80);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

     function signDocument(bytes32 _claimId, bytes _newBigchain_hash ) public {
        claimStorage.addSignatures(_claimId,_newBigchain_hash,msg.sender);
    }

    function getSignatures(bytes32 _claimId) public view returns (address[]) {
        return claimStorage.getSignatures(_claimId);
    }
}
