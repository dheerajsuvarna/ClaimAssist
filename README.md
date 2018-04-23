# BlockchainBLC4PI
This repository contains the basic folder structure for the BlockchainBLC4PI (SOSE 2018).

You may clone it by using the command ** *git clone https://EENFortiss@bitbucket.org/EENFortiss/blockchainblc4pi.git* **

# Steps to run the petshop application
1. Install truffle - `npm install -g truffle`
2. Install rimraf - `npm install -g rimraf`
3. Navigate to the project folder and run - `npm install` - this installs all the dependency modules
4. Open another console in same folder and run - `truffle develop` - this starts the truffle testrpc, which is a ethereum blockchain test network
5. In truffle console, run - `compile` - this compiles the smart contract
6. In truffle console, run - `migrate` - this migrates the smart contracts to the test network
7. Open another console and run - `npm run build:contracts` - this script copies the contracts from **./.build** folder to **/src/public/contracts**  
8. In the first console, run - `npm run start`
9. Go to **localhost:3001/petshop** and you should be able to see the UI of the petshop application

# Steps to interact with the petshop
1. To interact with the appliaction, you would need a wallet which facilitates communication between UI and test network
2. Install Metamask for your browser using this [link](https://metamask.io/) (We would suggest chrome) 
3. Configure Metamask by following this [link](http://truffleframework.com/tutorials/pet-shop#installing-and-configuring-metamask)
4. There are two differences while configuring metamask. One is, this project is not using ganache. You can find the seed in the truffle console if you scroll up and look for mnemonic
5. Another one is, truffle develop starts the test network on http://127.0.0.1:9545. So in private network, use this url
6. Once metamask is successfully integrated, you can click on **adopt** for any pet, and a pop-up from meta mask would appear asking you to verify the transaction
7. Once verified, the status of pet would change

**You have successfully installed and interacted with your first Dapp**

# Project structure and How to use this project to develop a new Dapp
1. ./contracts/yourProject - Store your smart contracts in this folder
2. ./migrations - Contains the migration script - edit `./migrations/2_deploy_contracts.js` to add your own contact. It migrates the contract to the blockchain
3. ./src/public/petshop - Contains the Dapp code for Petshop application - you can choose to create a separate folder inside ./src/public/yourProject for your project
4. ./src/server/index.js - Contains the server code. For petshop, it just handles redirecting the call `localhost:3001/petshop` to `../public/petshop/index.html`
5. You can create your own application's js file in the server folder and do the server side things when and as required
6. Every time you make a change in the contract, you need to `compile` and `migrate --reset` in **truffle develop console**
7. After compiling and migrating the contracts, you must also run `npm run build:contracts` script in another console
8. Now the contract would be updated in the application
