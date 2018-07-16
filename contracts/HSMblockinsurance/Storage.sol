pragma solidity 0.4.24;

/// @title The primary persistent storage for Claim Generation
/// @author Jeshwanth

contract Storage {

    struct claim {
        uint timestamp;
        bytes bigchain_hash;
        address[] signatures;
        //enum ClaimStage { initial, next };
        // claimStage public currentStage;
    }

    address Admin;

    mapping(address => bool) private PoliceStorage;
    mapping(address => bool) private HospitalStorage;
    mapping(bytes32 => claim) private Claims;

    /**** Set Methods ***********/

    function setClaim ( bytes32 key, uint _timeStamp, bytes _hash,  address[] _addressArray) external{
        Claims[key] = claim(_timeStamp, _hash, _addressArray);
    }

    function setSignature ( bytes32 key, address _address) external{
        Claims[key].signatures.push(_address);
    }

    function setHash ( bytes32 key, bytes _hash) external{
        Claims[key].bigchain_hash = _hash;
    }

    function setPolice(address _Address, address _adminAddress) external{
        require(_adminAddress == Admin);
        PoliceStorage[_Address] = true;
    }

    function setHospital(address _Address, address _adminAddress) external{
        require(_adminAddress == Admin);
        HospitalStorage[_Address] = true;
    }

    function setAdmin(address _Address, address _adminAddress) external{
        require(_adminAddress == Admin);
        Admin = _Address;
    }

    /**** Get Methods ***********/

    function getSignatures ( bytes32 key) external view returns (address[]){
        return Claims[key].signatures;
    }

    function getHash ( bytes32 key) external view returns (bytes){
        return Claims[key].bigchain_hash;
    }

    function checkIfPolice (address _Address) external view returns (bool){
        return PoliceStorage[_Address];
    }

    function checkIfHospital (address _Address) external view returns (bool){
        return HospitalStorage[_Address];
    }

    /**** Delete Methods ***********/

    /// @param _Address The address of Police
    function deletePolice(address _Address) external {
        delete PoliceStorage[_Address];
    }

    /// @param _Address The address of Hospital
    function deleteHospital(address _Address) external {
        delete HospitalStorage[_Address];
    }

}
