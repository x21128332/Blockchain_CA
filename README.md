## Blockchain_CA ##
Aisling Kearney, 21128332

## Deploy the contract to Ropsten ##
- Edit contract/KittyMeow_ECR20.sol token name and symbol
- Deploy contract/KittyMeow_ECR20.sol contract to Ropsten using Remix - https://remix.ethereum.org/

## Distribute tokens ##
- in VS Code terminal install all dependancies by running:  
```$npm install```
- Add a .env file, populate it with you details:  
INFURA_TOKEN=  
CONTRACT_ADDRESS=  
OWNER_ADDRESS=  
SUPER_SECRET_PRIVATE_KEY=  

- Edit accounts.txt to store the addresses you want to distribute the tokens to

- run:  
```$node distribute.js```
