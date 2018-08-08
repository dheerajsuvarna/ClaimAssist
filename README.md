# Claim Assist
> All your claims under one roof

![Logo](/readme_images/logo-reveal.gif)

----------------------------
Claim assist is a secure, decentralized application to handle all the claims settlement.

In the current scenario when an accident occurs, the two parties involved have to go through the entire rigorous and time-consuming process of claim settlement, starting from form filling to claim generation. To facilitate the policyholders, we have developed a web application that is automated, secure and easy to use. Further, we have used blockchain technology for handling the claim data which makes it fully tamperproof and reliable.


## Table of Contents
-----------------------------
- [Included Components](#included-components)
- [Prerequisites](#prerequisites)
- [Usecases](#usecases)
- [Architecture](#architecture)
  * [Application Architecture](#Application-Archtecture)
  * [Smart Contract Architecture](#Smart-Contract-Architecture)
- [Compatibility with other Blockchain based insurance applications](#compatibility-with-other-blockchain-based-insurance-applications)
- [Application Workflow](#application-workflow)
  * [Claim Generation](#claim-generation)
  * [Verification and Update](#verification-and-update)
  * [Police Report](#police-report)
  * [Hospital Report](#hospital-report)
- [Steps](#steps)
  * [1.Run the application](#1run-the-application)
- [Project structure](#project-structure)

    

## Included Components
----------------------------
- Ethereum
- BigchainDB
- IPFS

## Prerequisites
----------------------------
- Node : https://nodejs.org/en/
- NPM : https://www.npmjs.com/
- Truffle : https://truffleframework.com/
- BigchainDB : https://www.bigchaindb.com/
- IPFS : https://ipfs.io/

## Usecases
----------------------------

We have covered three different use cases :

1. Use case 1: Both the parties involved in the accident come to a mutual agreement on who is liable and submit the accident statement form to their respective insurance companies.
2. Use case 2: There is no mutual agreement on the accident perpetrator and hence they call Police to the scene and get the verification done. The Police will have to upload the report against the respective claim, based on the evidence collected.
3. Use case 3: There is an injury involved and hence there will be both Police and Hospital involved in the claim process. Both will generate their bills/reports and upload against the respective claim.

## Architecture
----------------------------
### Application Arcitecture
----------------------------
We make use IPFS to store the files and use BigchainDB as a registry.
#### Create a claim
----------------------------
When a claim is created, a unique claimID is generated and it is encrypted and then pushed to IPFS. Once we get the IPFS hash we, store this hash in BigchainDB. After that we get the BigchainDB transaction ID which we then add to the smart contract against the Unique ClaimID.
![claim creation process](readme_images/createClaim.JPG)
#### Retrieve a Claim
----------------------------
When we want to retrieve a file, first we query the smart contract with the claimID and get the BigchainHash. After this we Query bigchainDB and get the IPFS hash. Once we have the IPFS hash, we retrieve the files from IPFS and then Decrypt it on our Node server then send it to the client.
![claim retrieval process](readme_images/retriveClaim.JPG)
#### Update a claim
----------------------------
Now if we want to update some claim Information (Police, other Party or Hospital) we first retrieve it and then update the information then follow the same steps as creating a claim, but in the end we save the new BigchainDb transaction ID against the same ClaimID.
![claim updation process](readme_images/updateAClaim.JPG)

### Smart Contract Architecture
----------------------------
We have used Hub and Spoke architecture where `ClaimStorage.sol` is our hub and other contracts as our spokes. We also employed a persistent storage model which helps in upgradability of contracts. The DApp code interacts with the spokes and store/update/retrieve the data from the storage contract.  

![Smart contract Architecture](readme_images/smartContractArchitecture.JPG)

The Advantages of using this architecture is that, it allows us to separate Data from Logic. Lets say some Logic has to be replaced, we can easily do it, without the fear of losing the data.

![smart contract Delegate architecture](readme_images/SmartContract_delegate.JPG)

The Above architecture is built upon the Hub and spoke model, where we have a cetral contract which delegaets the request to the respective logic contracts and also has a Data Storage contract. With this, we can have contract address registry and easily update contract logic. This will be implemented in the next phase.

## Compatibility with other Blockchain based insurance applications
----------------------------
We have designed our distributed application such that it can act as a third-party service to multiple insurance companies. Our aim is to ease the claim generation and settlement process for insurance companies and involved stakeholders. We provide an API for the insurance companies where they can request for all the data that is required for their claim handling process. Claim data is encrypted and tamper-proof.



## Application Workflow
----------------------------

### Claim Generation
----------------------------
The Accident victim/perpetrator logs into the system and fills the Claim form. On submitting the form, the form details and the supporting files are also stored on IPFS. The hash of these files is stored over the BigchainDB along with the Claim id. BigchainDB acts as a registry for all the claim related data. The hash of BigchainDB is now stored in the blockchain against the Claim id. This completes the Claim generation process.

![claim generation process](readme_images/claim_generation.gif)

### Verification and Update
----------------------------
Now the other party can log into our system and see the respective claim on Notifications page. When he clicks on View, the claim data is retrieved back from the blockchain and displayed to the user. Now the victim can verify the data filled by the first party, agree/disagree with the details, and also give his remarks and submit the form. The Claim updating process works similar to the Claim generation. The updated file is stored in IPFS and the new IPFS hash is stored in BigchainDB, and finally, the new BigchainDB hash is stored in the blockchain.

![Verification and update](readme_images/claim_generation.gif)

### Police Report
----------------------------
Meanwhile, the police will get a notification about the accident. They will investigate the case, generate a report and upload all the supporting documents.
![police report](readme_images/police.gif)

### Hospital Report
----------------------------
If any injuries are involved in the accident the Hospital also will come into the picture. The hospital can also login into our system and upload all the bills and other documents and submit it with the Claim id.
![Hospital report](readme_images/police.gif)

## Steps:
----------------------------
# 1.Run the application 
- Clone the repository: `git clone git@bitbucket.org:dheerajsuvarna2/blockinsurance.git`
- Install truffle - `npm install -g truffle`
- Install rimraf - `npm install -g rimraf`
- Navigate to the project folder and run - `npm install` - this installs all the dependency modules
- Open another console in the same folder and run - `truffle develop` - this starts the truffle testrpc, which is an Ethereum blockchain test network
- In truffle console, run - `compile` - this compiles the smart contract
- In truffle console, run - `migrate` - this migrates the smart contracts to the test network
- Now for our Hub and spoke model to work, copy the deployed address of "ClaimStorage" contract and paste it in the other contracts (claim.sol,agreement.sol,police.sol,hospital.sol,claimManger.sol).

# 1.Workflow
### Policy Holder
- First Goto BigchainDb testnet, make sure it is working.
- Goto http://localhost:3001 
- Login into Metamask
- In the Dropdown, select "Policy Holder"
- Enter Username - claimAssist , Password - claimAssist 
- Select "Create Claim" on the side Menu
- You can either fill out the Form or click on Autofill at the Top.
- Once filled, Click on submit.
- Expected Result : You should get pop up modal saying Claim Successfully added. Click on the link.

### Second Party
- Click on Metamask and create another account. 
- Switch to Account 2 
- Fill the Form and click Submit
- Expected Result : You should get pop up modal saying Agreement Signed. Click on the link to proceed.

### Police
- create another Account in Metamask, Switch to Account 3
- Now open a New tab, and once again goto  http://localhost:3001.
- Now, in the dropdown select "Admin" and login using the same credentials.
- Add a new Police Station. 
- Expected Result : You should get alert message saying New Police Station Added
- Now goto the previous tab with the Police Form, Fill it up and Submit.
- Expected Result : You should get a modal saying Police report has been added. Click on the link to proceed.

### Hospital
- create another Account in Metamask, Switch to Account 4
- Now open a New tab, and once again goto  http://localhost:3001.
- Now, in the dropdown select "Admin" and login using the same credentials.
- Add a new Hospital Station. 
- Expected Result : You should get alert message saying New Hospital Added
- Now goto the previous tab with the Hospital Form, Fill it up and Submit.
- Expected Result : You should get a modal saying Hospital Bill Added.

#### After this the Claim is sent to insurance company. This part is handled by the other team.


# Project structure
- ./contracts/claimAssist - Smart contracts are in this folder.
- ./migrations - Contains the migration script. It migrates the contract to the blockchain.
- ./src/public/blockinsurance - Contains the Dapp code for Claim Assist application.
- ./src/public/blockinsurance/js/controllers/index.js - Contains the frontend JavaScript code.
- ./src/server/claimAssist.js - Contains the routes.
- ./src/server/index.js - Contains the server code.
- ./src/server - Contains the code for encryption and interacting with BigchainDB and IPFS.
