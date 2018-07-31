pragma solidity ^0.4.4;

contract ClaimStorage {

    enum Status { Initiated, Signed, ReceivedAllDocuments, ClaimSettled }

    struct claim {
        uint timestamp;
        string bigchain_hash;
        address[] signatures;
        Status claimStatus;
    }


    /**** Storage Types *******/

    mapping(bytes32 => address)    private addressStorage;
    mapping(bytes32 => bool)       private boolStorage;
    mapping(address => bool)       private policeRegistry;
    mapping(address => bool)       private hospitalRegistry;
    mapping(bytes32 => claim)      private claims;



    /*** Modifiers ************/

    /// Only allow access from the latest version of a contract in the network after deployment
    modifier onlyLatestClaimAssistContract() {
       // The owner and other contracts are only allowed to set the storage upon deployment to register the initial contracts/settings, afterwards their direct access is disabled
        if (boolStorage[keccak256("contract.storage.initialised")] == true) {
            // Make sure the access is permitted to only contracts in our Dapp
            require(addressStorage[keccak256(abi.encodePacked("contract.address", msg.sender))] != 0x0);
        }
        _;
    }


     /**** Get Methods ***********/

    function getAddress(bytes32 _key) external view returns (address) {
        return addressStorage[_key];
    }

    function getBigchainHash(string _claimId) external view returns (string) {
        return claims[keccak256(abi.encodePacked(_claimId))].bigchain_hash;
    }

    function getSignatures(string _claimId) external view returns (address[]) {
        return claims[keccak256(abi.encodePacked(_claimId))].signatures;
    }

    function getHospitalBool(address _hospitalAddress) external view returns (bool) {
        return hospitalRegistry[_hospitalAddress];
    }

     function getPoliceBool(address _policeAddress) external view returns (bool) {
        return policeRegistry[_policeAddress];
    }

    function getClaimStatus(string _claimId) external view returns (string) {
        if (Status.Initiated ==  claims[keccak256(abi.encodePacked(_claimId))].claimStatus) return "Initiated";
        if (Status.Signed ==  claims[keccak256(abi.encodePacked(_claimId))].claimStatus) return "Signed";
        if (Status.ReceivedAllDocuments ==  claims[keccak256(abi.encodePacked(_claimId))].claimStatus) return "ReceivedAllDocuments";
        if (Status.ClaimSettled ==  claims[keccak256(abi.encodePacked(_claimId))].claimStatus) return "ClaimSettled";
        return "";
    }


    /**** Set Methods ***********/

    function setAddress(bytes32 _key, address _value) onlyLatestClaimAssistContract external {
        addressStorage[_key] = _value;
    }


    function setNewHash(string _claimId, string _newBigchain_hash) onlyLatestClaimAssistContract external {
        claims[keccak256(abi.encodePacked(_claimId))].bigchain_hash = _newBigchain_hash;
        claims[keccak256(abi.encodePacked(_claimId))].claimStatus = Status.ReceivedAllDocuments;
    }

    function addSignatures(string _claimId, string _newBigchain_hash,address _sender) onlyLatestClaimAssistContract external {
        claims[keccak256(abi.encodePacked(_claimId))].bigchain_hash = _newBigchain_hash;
        claims[keccak256(abi.encodePacked(_claimId))].signatures.push(_sender);
        claims[keccak256(abi.encodePacked(_claimId))].claimStatus = Status.Signed;
    }

    function setClaim(string _claimId, string _bigchainHash,address _senderAddress) onlyLatestClaimAssistContract  external{
        address[] memory sender = new address[](1);
        sender[0] = _senderAddress;
        claims[keccak256(abi.encodePacked(_claimId))] = claim(now, _bigchainHash, sender, Status.Initiated);
    }

    function setHospitalBool(address _hospitalAddress) onlyLatestClaimAssistContract external {
        hospitalRegistry[_hospitalAddress] = true;
    }

    function setPoliceBool(address _policeAddress) onlyLatestClaimAssistContract external {
        policeRegistry[_policeAddress] = true;
    }

    /**** Delete Methods ***********/

    function deleteAddress(bytes32 _key) onlyLatestClaimAssistContract external {
        delete addressStorage[_key];
    }


    function deleteClaim(string _claimId) onlyLatestClaimAssistContract external {
        delete claims[keccak256(abi.encodePacked(_claimId))];
    }

}
