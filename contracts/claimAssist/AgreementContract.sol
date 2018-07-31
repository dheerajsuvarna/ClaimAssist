pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";


contract AgreementContract {

    ClaimStorage claimStorage = ClaimStorage(0x4e71920b7330515faf5ea0c690f1ad06a85fb60c);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

     function signDocument(string _claimId, string _newBigchain_hash ) public {
        claimStorage.addSignatures(_claimId,_newBigchain_hash,msg.sender);
    }

    function getSignatures(string _claimId) public view returns (address[]) {
        return claimStorage.getSignatures(_claimId);
    }
}
