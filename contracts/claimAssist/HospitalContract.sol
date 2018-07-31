pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";

contract HospitalContract {

    event HospitalStatus(
        address indexed _from,
        string _claimid,
        string _claimstatus
    );

    ClaimStorage claimStorage = ClaimStorage(0x345ca3e014aaf5dca488057592ee47305d9b3e10);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained


    modifier onlyRegisteredHospital(address _resgisteredHospitalAddress) {
        require(claimStorage.getHospitalBool(_resgisteredHospitalAddress) == true);
        _;
    }

    function addHospitalBill(string _claimId, string _newBigchain_hash ) public onlyRegisteredHospital(msg.sender){
        claimStorage.setNewHash(_claimId,_newBigchain_hash);
        emit HospitalStatus(msg.sender, _claimId, claimStorage.getClaimStatus(_claimId));
    }

}
