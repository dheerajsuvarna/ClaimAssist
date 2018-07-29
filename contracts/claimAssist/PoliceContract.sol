pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";



/// @title Examples of how to store and read a contract address in your dApps eternal storage for use in the hub / spoke pattern

contract PoliceContract {


    /*** Contracts **************/

    ClaimStorage claimStorage = ClaimStorage(0xbde95422681e4c3984635af2f2f35f8c44a4ddc9);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

    /*** Modifiers ***********/

    modifier onlyRegisteredPolice(address _resgisteredPoliceAddress) {
        require(claimStorage.getPoliceBool(_resgisteredPoliceAddress) == true);
        _;
    }

    function addPoliceReport(string _claimId, string _newBigchain_hash ) public onlyRegisteredPolice(msg.sender) {
        claimStorage.setNewHash(_claimId,_newBigchain_hash);
    }
}
