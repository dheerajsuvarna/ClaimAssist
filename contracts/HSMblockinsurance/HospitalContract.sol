pragma solidity ^0.4.24;

import "./Storage.sol";

contract HospitalContract{

    Storage claimStorage = Storage(0);

    //constructor() public{
    //       HospitalRegistry[0xca35b7d915458ef540ade6068dfe2f44e8fa733d] = true;
    // }

    function addHospitalBill(bytes32 _claimId, bytes _newBigchain_hash) public {
       // accidentParties[msg.sender].push(agreementId);
        //require(claimS[_claimId].currentStage == "initial");
        claimStorage.checkIfHospital(msg.sender);
        claimStorage.setHash(_claimId, _newBigchain_hash);
    }

    function addHospitalAddress(address _newHospitalAddress) public{
        claimStorage.setHospital(_newHospitalAddress, msg.sender);
    }
}
