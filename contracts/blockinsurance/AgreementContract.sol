pragma solidity ^0.4.4;

contract AgreementContract{
    struct claim {
        uint timestamp;
        bytes bigchain_hash;
        address[] signatures;
        //enum ClaimStage { initial, next };
       // claimStage public currentStage;
    }


    mapping(bytes32 => claim) public claimS;
    //event test_value(bytes32 indexed value1);


    function addClaim( bytes32 claimId, bytes _bigchainHash, uint _timeStamp) public returns (bytes32) {
        address[] memory sender = new address[](1);
        sender[0] = msg.sender;
        //bytes32 claimId = keccak256(abi.encodePacked(_policyNumber, _timeStamp));
        claimS[claimId] = claim(_timeStamp, _bigchainHash, sender);
        //emit test_value(claimId);
        return claimId;
    }

    function signDocument(bytes32 _claimId, bytes _newBigchain_hash ) public {
        //require(msg.sender == claimStatements[keccak256(agreementId)].signatures[0]);
        claimS[_claimId].bigchain_hash = _newBigchain_hash;
        claimS[_claimId].signatures.push(msg.sender);
    }

    function getSignatures(bytes32 _claimId) public view returns (address[]) {
        return claimS[_claimId].signatures;
    }

    function getBigchainHash(bytes32 _claimId) public view returns (bytes) {
        return claimS[_claimId].bigchain_hash;
    }



}
