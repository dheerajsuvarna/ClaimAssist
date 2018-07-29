pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";



/// @title Examples of how to store and read a contract address in your dApps eternal storage for use in the hub / spoke pattern
/// @author David Rugendyke

contract HospitalContract {


    /*** Contracts **************/

    ClaimStorage claimStorage = ClaimStorage(0x2467636bea0f3c2441227eedbffac59f11d54a80);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained
    Claim claim = Claim(0);                  // The contract that contains the claim methods in Rocket Pool

    /*** Modifiers ***********/

    modifier onlyRegisteredHospital(address _resgisteredHospitalAddress) {
        require(claimStorage.getHospitalBool(_resgisteredHospitalAddress) == true);
        _;
    }

    function addHospitalBill(bytes32 _claimId, bytes _newBigchain_hash ) public onlyRegisteredHospital(msg.sender){
        claimStorage.setNewHash(_claimId,_newBigchain_hash);
    }

}
