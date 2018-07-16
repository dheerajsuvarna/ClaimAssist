pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";


contract AgreementContract {
    
    ClaimStorage claimStorage = ClaimStorage(0x75a3a98f5696299071da253c1433a2661898103e);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained
    
     function signDocument(bytes32 _claimId, bytes _newBigchain_hash ) public {
        claimStorage.addSignatures(_claimId,_newBigchain_hash,msg.sender);
    }

    function getSignatures(bytes32 _claimId) public view returns (address[]) {
        return claimStorage.getSignatures(_claimId);
    }
}
