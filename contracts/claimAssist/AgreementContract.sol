pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";


contract AgreementContract {

    ClaimStorage claimStorage = ClaimStorage(0xbde95422681e4c3984635af2f2f35f8c44a4ddc9);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

     function signDocument(string _claimId, string _newBigchain_hash ) public {
        claimStorage.addSignatures(_claimId,_newBigchain_hash,msg.sender);
    }

    function getSignatures(string _claimId) public view returns (address[]) {
        return claimStorage.getSignatures(_claimId);
    }
}
