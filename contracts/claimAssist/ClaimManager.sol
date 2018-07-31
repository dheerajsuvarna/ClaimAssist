pragma solidity ^0.4.4;

import "./ClaimStorage.sol";
import "./Claim.sol";


contract ClaimManager {

    ClaimStorage claimStorage = ClaimStorage(0x4e71920b7330515faf5ea0c690f1ad06a85fb60c);
     /*** Events ****************/

    event ContractUpgraded (
        address indexed _oldContractAddress,                    // Address of the contract being upgraded
        address indexed _newContractAddress,                    // Address of the new contract
        uint256 created                                         // Creation timestamp
    );

    event ContractAdded (
        address indexed _contractAddress,                       // Address of the contract added
        uint256 created                                         // Creation timestamp
    );

    /**** Contract Upgrade Methods ***********/

    /// @param _name The name of an existing contract in the network
    /// @param _upgradedContractAddress The new contracts address that will replace the current one
    /// @param _upgradedContractAbi The zlib compressed, base64 encoded ABI of the new contract
    /// @param _forceEther Force the upgrade even if this contract has ether in it
    function upgradeContract(string _name, address _upgradedContractAddress, string _upgradedContractAbi, bool _forceEther)  external {
        // Get the current contracts address
        address oldContractAddress = claimStorage.getAddress(keccak256("contract.name", _name));
        // Check it exists
        require(oldContractAddress !=  0x0);
        // Check it is not the contract's current address
        require(oldContractAddress != _upgradedContractAddress);
        // Firstly check the contract being upgraded does not have a balance, if it does, it needs to transfer it to the upgraded contract through a local upgrade method first
        // Ether can be forcefully sent to any contract though (even if it doesn't have a payable method), so to prevent contracts that need upgrading and for some reason have a balance, use the force method to upgrade them
        if (!_forceEther) {
            require(oldContractAddress.balance == 0);
        }
        // Replace the address for the name lookup - contract addresses can be looked up by their name or verified by a reverse address lookup
        claimStorage.setAddress(keccak256("contract.name", _name), _upgradedContractAddress);
        // Replace the stored contract ABI
        //claimStorage.setString(keccak256("contract.abi", _name), _upgradedContractAbi);
        // Add the new contract address for a direct verification using the address (used in ClaimAssist to verify its a legit contract using only the msg.sender)
        claimStorage.setAddress(keccak256("contract.address", _upgradedContractAddress), _upgradedContractAddress);
        // Remove the old contract address verification
        claimStorage.deleteAddress(keccak256("contract.address", oldContractAddress));
        // Log it
        emit ContractUpgraded(oldContractAddress, _upgradedContractAddress, now);
    }

    /// @param _name The name of the new contract
    /// @param _contractAddress The address of the new contract
    /// @param _contractAbi The zlib compressed, base64 encoded ABI of the new contract
    function addContract(string _name, address _contractAddress, string _contractAbi)  external {
        // Check the contract address
        require(_contractAddress != 0x0);
        // Check the name is not already in use
        address existingContractName = claimStorage.getAddress(keccak256("contract.name", _name));
        require(existingContractName == 0x0);
        // Check the address is not already in use
        address existingContractAddress = claimStorage.getAddress(keccak256("contract.address", _contractAddress));
        require(existingContractAddress == 0x0);
        // Set contract name, address and ABI in storage
        claimStorage.setAddress(keccak256("contract.name", _name), _contractAddress);
        claimStorage.setAddress(keccak256("contract.address", _contractAddress), _contractAddress);
      //  claimStorage.setString(keccak256("contract.abi", _name), _contractAbi);
        // Log it
        emit ContractAdded(_contractAddress, now);
    }

    function addHospitalToRegistry(address _newHospitalAddress) public{
        claimStorage.setHospitalBool(_newHospitalAddress);
    }

    function addPoliceToRegistry(address _newPoliceAddress) public{
        claimStorage.setPoliceBool(_newPoliceAddress);
    }

}
