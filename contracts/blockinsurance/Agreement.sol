pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Agreement{
    struct claim {
        uint timestamp;
        bytes bigchain_hash;
        address[] signatures;
        //enum ClaimStage { initial, next };
       // claimStage public currentStage;
    }


    //mapping(address => bytes[]) public accidentParties;
    mapping(bytes32 => claim) public claimS;
    event test_value(bytes32 indexed value1);

    function addClaim( string _policyNumber,bytes _bigchainHash) public returns (bytes32) {
        //accidentParties[msg.sender].push(ipfs);
        address[] memory sender = new address[](1);
        sender[0] = msg.sender;
        bytes32 claimId = keccak256(abi.encodePacked(_policyNumber, block.timestamp));
        claimS[claimId] = claim(block.timestamp, _bigchainHash, sender);
        emit test_value(claimId);
        return claimId;
    }

    function signDocument(bytes32 _claimId, bytes _newBigchain_hash ) public {
       // accidentParties[msg.sender].push(agreementId);
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
