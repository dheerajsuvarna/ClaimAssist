pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";



/// @title Examples of how to store and read a contract address in your dApps eternal storage for use in the hub / spoke pattern
/// @author David Rugendyke

contract PoliceContract {


    /*** Contracts **************/

    ClaimStorage claimStorage = ClaimStorage(0xecfcab0a285d3380e488a39b4bb21e777f8a4eac);         // The main ClaimAssist (The HUB) contract where primary persistant storage is maintained

    /*** Modifiers ***********/

    modifier onlyRegisteredPolice(address _resgisteredPoliceAddress) {
        require(claimStorage.getPoliceBool(_resgisteredPoliceAddress) == true);
        _;
    }

    function addPoliceReport(bytes32 _claimId, bytes _newBigchain_hash ) public onlyRegisteredPolice(msg.sender) {
        claimStorage.setNewHash(_claimId,_newBigchain_hash);
    }
}
