pragma solidity ^0.4.24;

import "./Storage.sol";

contract PoliceContract{

    Storage claimStorage = Storage(0);

    // constructor() public{
    //       policeRegistry[0xca35b7d915458ef540ade6068dfe2f44e8fa733b] = true;
    // }

    function addPoliceReport(bytes32 _claimId, bytes _newBigchain_hash ) public {
       // accidentParties[msg.sender].push(agreementId);
        //require(claimS[_claimId].currentStage == "initial");
        claimStorage.checkIfPolice(msg.sender);
        claimStorage.setHash(_claimId, _newBigchain_hash);
    }

    function addPoliceAddress(address _newPoliceAddress) public{
        claimStorage.setPolice(_newPoliceAddress, msg.sender);
    }
}
