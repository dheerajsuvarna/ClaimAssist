![](readme_images/logo.png)

# Claim Assit
> All your claims under one roof
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
![Work-Flow](/readme_images/workflow.jpg)

There are 3 usercases involved

1. Usecase 1: At the scene of accident both the parties agree on the fault and settle the claim on their own.
2. usecase 2: There is no mutual agreement on the accident perpetrator and hence they call police to the scene and get the verification done. The Police will also generate a report based on the evidences collected.
3. usecase 3: There is an injury involved and hence there will police and hospital invloved in the claim process. The police and hiospital will generate their bill and reports and upload it.


## Application Workflow
----------------------------

### Claim generation
----------------------------
The Accident victim/ AP logs in into the system and starts to fill the data for the claim form, the details include his personal as well as the other party's information. once the person submits the form, the supporting files are stored on the IPFS, and the form details is stored in the IPFS as a json, the hash of this file is stored over the Bigchaindb along with the claim id. The bigchaindb acts as a registery for all the claim related data. The hash of bigchain is now stored in the blockchain against the claim id.

![claim generation process](readme_images/claim_generation.gif)


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

![Landing_page](readme_images/workflow.jpg)



## Contributing

When you publish something open source, one of the greatest motivations is that
anyone can just jump in and start contributing to your project.

These paragraphs are meant to welcome those kind souls to feel that they are
needed. You should state something like:

"If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome."

If there's anything else the developer needs to know (e.g. the code style
guide), you should link it here. If there's a lot of things to take into
consideration, it is common to separate this section to its own file called
`CONTRIBUTING.md` (or similar). If so, you should say that it exists here.

## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Project homepage: https://your.github.com/awesome-project/
- Repository: https://github.com/your/awesome-project/
- Issue tracker: https://github.com/your/awesome-project/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    my@email.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!
- Related projects:
  - Your other project: https://github.com/your/other-project/
  - Someone else's project: https://github.com/someones/awesome-project/


## Licensing

One really important part: Give your project a proper license. Here you should
state what the license is and how to find the text version of the license.
Something like:

"The code in this project is licensed under MIT license."