pragma solidity ^0.4.4;

import "./AgreementContract.sol";

contract HospitalContract is AgreementContract{

    mapping (address => bool) public HospitalRegistry;
    address hospitalAdmin = 0xca35b7d915458ef540ade6068dfe2f44e8fa730f;

    constructor() public{
           HospitalRegistry[0xca35b7d915458ef540ade6068dfe2f44e8fa733d] = true;
     }

    function addHospitalBill(bytes32 _claimId, bytes _newBigchain_hash ) public {
       // accidentParties[msg.sender].push(agreementId);
        require(HospitalRegistry[msg.sender] == true);
        //require(claimS[_claimId].currentStage == "initial");
        claimS[_claimId].bigchain_hash = _newBigchain_hash;
    }

    function addHospitalAddress(address _newHospitalAddress) public{
        require(msg.sender == hospitalAdmin);
        HospitalRegistry[_newHospitalAddress] = true;
    }
}
