pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";

contract PoliceContract {

    event PoliceStatus(
        address indexed _from,
        string _claimid,
        string _claimstatus
    );

    ClaimStorage claimStorage = ClaimStorage(0x4e71920b7330515faf5ea0c690f1ad06a85fb60c);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained


    modifier onlyRegisteredPolice(address _resgisteredPoliceAddress) {
        require(claimStorage.getPoliceBool(_resgisteredPoliceAddress) == true);
        _;
    }

    function addPoliceReport(string _claimId, string _newBigchain_hash ) public onlyRegisteredPolice(msg.sender) {
        claimStorage.setNewHash(_claimId,_newBigchain_hash);
        emit PoliceStatus(msg.sender, _claimId, claimStorage.getClaimStatus(_claimId));
    }
}
