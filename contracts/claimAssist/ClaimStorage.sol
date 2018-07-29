pragma solidity ^0.4.4;

contract ClaimStorage {

    struct claim {
        uint timestamp;
        string bigchain_hash;
        address[] signatures;
    }


    /**** Storage Types *******/
    mapping(bytes32 => address)    private addressStorage;
    mapping(bytes32 => bool)       private boolStorage;
    mapping(address => bool)       private policeRegistry;
    mapping(address => bool)       private hospitalRegistry;
    mapping(bytes32 => claim)      private claims;



    /*** Modifiers ************/


     /*modifier onlyOwner() {
        roleCheck("owner", msg.sender);
        _;
    }*/

    /// Only allow access from the latest version of a contract in the network after deployment
    modifier onlyLatestClaimAssistContract() {
       // The owner and other contracts are only allowed to set the storage upon deployment to register the initial contracts/settings, afterwards their direct access is disabled
        if (boolStorage[keccak256("contract.storage.initialised")] == true) {
            // Make sure the access is permitted to only contracts in our Dapp
            require(addressStorage[keccak256(abi.encodePacked("contract.address", msg.sender))] != 0x0);
        }
        _;
    }




    /// @dev constructor
    //constructor() public payable{
        // Set the main owner upon deployment
      //  boolStorage[keccak256(abi.encodePacked("access.role", "owner", msg.sender))] = true;
   // }


   /* function roleHas(string _role, address _address) internal view returns (bool) {
        return claimStorage.getBool(keccak256("access.role", _role, _address));
    }

       /**
    * @dev Check if an address has this role, reverts if it doesn't

    function roleCheck(string _role, address _address) view internal {
        require(roleHas(_role, _address) == true);
    } */
     /**** Get Methods ***********/

    /// @param _key The key for the record
    function getAddress(bytes32 _key) external view returns (address) {
        return addressStorage[_key];
    }

    /// The key for the record
    function getBigchainHash(string _claimId) external view returns (string) {
        return claims[keccak256(abi.encodePacked(_claimId))].bigchain_hash;
    }

    ///  The key for the record
    function getSignatures(string _claimId) external view returns (address[]) {
        return claims[keccak256(abi.encodePacked(_claimId))].signatures;
    }

    function getHospitalBool(address _hospitalAddress) external view returns (bool) {
        return hospitalRegistry[_hospitalAddress];
    }

     function getPoliceBool(address _policeAddress) external view returns (bool) {
        return policeRegistry[_policeAddress];
    }



    /**** Set Methods ***********/

    /// @param _key The key for the record
    function setAddress(bytes32 _key, address _value) onlyLatestClaimAssistContract external {
        addressStorage[_key] = _value;
    }


    function setNewHash(string _claimId, string _newBigchain_hash) onlyLatestClaimAssistContract external {
        claims[keccak256(abi.encodePacked(_claimId))].bigchain_hash = _newBigchain_hash;
    }

    ///  The key for the record
    function addSignatures(string _claimId, string _newBigchain_hash,address _sender) onlyLatestClaimAssistContract external {
        claims[keccak256(abi.encodePacked(_claimId))].bigchain_hash = _newBigchain_hash;
        claims[keccak256(abi.encodePacked(_claimId))].signatures.push(_sender);
    }

    /// The key for the record
    function setClaim(string _claimId, string _bigchainHash,address _senderAddress) onlyLatestClaimAssistContract  external{
        address[] memory sender = new address[](1);
        sender[0] = _senderAddress;
        claims[keccak256(abi.encodePacked(_claimId))] = claim(now, _bigchainHash, sender);
    }

    function setHospitalBool(address _hospitalAddress) onlyLatestClaimAssistContract external {
        hospitalRegistry[_hospitalAddress] = true;
    }

    function setPoliceBool(address _policeAddress) onlyLatestClaimAssistContract external {
        policeRegistry[_policeAddress] = true;
    }

    /**** Delete Methods ***********/

    ///  The key for the record
    function deleteAddress(bytes32 _key) onlyLatestClaimAssistContract external {
        delete addressStorage[_key];
    }


    function deleteClaim(string _claimId) onlyLatestClaimAssistContract external {
        delete claims[keccak256(abi.encodePacked(_claimId))];
    }

}
