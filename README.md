>>>>>>>>>>![](readme_images/logo.png)

# Claim Assit
>> All your claims under one roof
----------------------------
Claim assist is a secure, decentralized application to handle all the claims settlement at the click of a button.

Currently when a accident ooccurs, the two parties will have to involve in the whole process of claim settlement physically starting from filling the form to claim generation,
and in this process there is a lot of time and energy wasted. So we wanted to make the life of the policy holders easy by developing an online process that is automated, secure and simple. 
We use blockchain technology for handling the claim data which makes it fully tamperproof and reliable.


## Included Components
----------------------------
- Ethereum
- Bigchain
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

There are 3 usercases involved

1. Usecase 1: At the scene of accident both the parties agree on the fault and settle the claim on their own.
2. usecase 2: There is no mutual agreement on the accident perpetrator and hence they call police to the scene and get the verification done. The Police will also generate a report based on the evidences collected.
3. usecase 3: There is an injury involved and hence there will police and hospital invloved in the claim process. The police and hiospital will generate their bill and reports and upload it.

## Architecture
----------------------------



## Compatibility with other blockchain based insurance Application
----------------------------
The system is designed such that it can provide service to multiple insurance companies. The aim is to reduce the job of the insurance companies of getting involved in the claim generation process which is actually painful. We provide an API for the insurance comapnies where they can request for all the data that is requeired for their claim handling process. All the data is encrypted and cant be tampered. 



## Application Workflow
----------------------------

### Claim Generation
----------------------------
The Accident victim/ AP logs in into the system and starts to fill the data for the claim form, the details include his personal as well as the other party's information. once the person submits the form, the supporting files are stored on the IPFS, and the form details is stored in the IPFS as a json, the hash of this file is stored over the Bigchaindb along with the claim id. The bigchaindb acts as a registery for all the claim related data. The hash of bigchain is now stored in the blockchain against the claim id.

![claim generation process](readme_images/claim_generation.gif)

### Verification and Update
----------------------------
Now the victim can login with his credentials into our system and see the claim in his repository. When he clicks on the entry, the claim data is retrived back from the blockchain. This will have the claim id along with the bigchain db hash, using this hash we query the bigchainDB and get the IPFS hash. The IPFS has will lead us to the form data with all the suporting files uploaded already against the claim. Now the victim can verify the data filled by the first party, and leave his comment and finally submit the form. The updating of the data works similar to the storage.The updated file is stored in IPFS and the new IPFS hash is stored in bigchain, and finally the new bigchain hash is stored in the blockchain.

![Verification and update](readme_images/claim_generation.gif)

### Police Report 
----------------------------
Mean police will get a notification about the accident.They will investigate the case, generate a report and upload all the supporting document. 
![police report](readme_images/police.gif)

### Hospital Report
----------------------------
If any injuries are involved in the accident the Hospital also will come into picture. The hospital can also log in into our system and upload all the bills and other documents and submit it with the claim ID.
![Hospital report](readme_images/police.gif)

## Steps:
----------------------------
# 1.Run the application
- Clone the repository:
`git clone git@bitbucket.org:dheerajsuvarna2/blockinsurance.git`
- Go to the project directory and intall the dependencies:
```npm install```
- Run the application finally :
` npm run `

Use the link http://localhost:3001 to load the web application in browser.

This will take you to the landing page of our application. You can find more details about our application here.
