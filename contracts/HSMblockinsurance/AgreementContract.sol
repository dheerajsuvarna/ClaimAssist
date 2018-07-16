pragma solidity ^0.4.24;

import "./Storage.sol";

contract AgreementContract{

    Storage claimStorage = Storage(0);

    function addClaim( bytes32 _claimId, bytes _bigchainHash, uint _timeStamp) private returns (bytes32) {
        address[] memory sender = new address[](1);
        sender[0] = msg.sender;
        //bytes32 claimId = keccak256(abi.encodePacked(_policyNumber, _timeStamp));
        claimStorage.setClaim(_claimId, _timeStamp, _bigchainHash, sender);
        return _claimId;
    }

    function signDocument(bytes32 _claimId, bytes _newBigchain_hash ) private {
        //require(msg.sender == claimStatements[keccak256(agreementId)].signatures[0]);
        claimStorage.setHash(_claimId, _newBigchain_hash);
        claimStorage.setSignature(_claimId, msg.sender);
    }

    function getAllSignatures(bytes32 _claimId) private view returns (address[]) {
        return claimStorage.getSignatures(_claimId);
    }

    function getBigchainHash(bytes32 _claimId) private view returns (bytes) {
        return claimStorage.getHash(_claimId);
    }



}
