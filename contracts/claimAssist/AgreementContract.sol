pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";


contract AgreementContract {

    ClaimStorage claimStorage = ClaimStorage(0x2e335f247e91caa168c64b63104c4475b2af3942);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

    event AgreementStatus(
        address indexed _from,
        string _claimid,
        string _claimstatus
    );

     function signDocument(string _claimId, string _newBigchain_hash ) public {
        claimStorage.addSignatures(_claimId,_newBigchain_hash, msg.sender);
        emit AgreementStatus(msg.sender, _claimId, claimStorage.getClaimStatus(_claimId));
    }

    function getSignatures(string _claimId) public view returns (address[]) {
        return claimStorage.getSignatures(_claimId);
    }
}
