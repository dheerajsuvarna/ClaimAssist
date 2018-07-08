pragma solidity ^0.4.4;

import "./AgreementContract.sol";

contract PoliceContract is AgreementContract{

    mapping (address => bool) public policeRegistry;
    address policeAdmin = 0xca35b7d915458ef540ade6068dfe2f44e8fa730e;

     constructor() public{
           policeRegistry[0xca35b7d915458ef540ade6068dfe2f44e8fa733b] = true;
     }

    function addPoliceReport(bytes32 _claimId, bytes _newBigchain_hash, address _policeAddress ) public {
       // accidentParties[msg.sender].push(agreementId);
        require(policeRegistry[_policeAddress] == true);
        //require(claimS[_claimId].currentStage == "initial");
        claimS[_claimId].bigchain_hash = _newBigchain_hash;
    }

    function addPoliceAddress(address _newPoliceAddress) public{
        require(msg.sender == policeAdmin);
        policeRegistry[_newPoliceAddress] = true;
    }
}
