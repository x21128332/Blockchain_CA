## Blockchain_CA  
Aisling Kearney, 21128332  
Ethereum Account: 0x5ef5090b5701CE6E36939eddE4bD4D30966f2604  
Contract Address: 0xDe6e90b83B56126ff4EA109467efa79E7f82d767  


## Create your ethereum account ##
Using Metamask create an account and set your secret phrase.
Take note of your account number this is needed to populate "OWNER_ADDRESS" in your .env file below
Go to account details and export your private key this is needed to populate "SUPER_SECRET_PRIVATE_KEY" in your .env file below

## Create your token ##
- Edit contract/KittyMeow_ECR20.sol "token name" and "symbol"
- Deploy contract/KittyMeow_ECR20.sol to Ropsten using Remix - https://remix.ethereum.org/
- Copy your contract address, you will need this in the .env file later
- Verify your contract and save your ABI (you will need this later)

## Distribute your token ##
- In VS Code terminal install all dependancies by running:  
```$npm install```
- Add a .env file, populate it with your details:  
&nbsp;&nbsp;&nbsp;&nbsp;INFURA_TOKEN=  
&nbsp;&nbsp;&nbsp;&nbsp;CONTRACT_ADDRESS=  
&nbsp;&nbsp;&nbsp;&nbsp;OWNER_ADDRESS=  
&nbsp;&nbsp;&nbsp;&nbsp;SUPER_SECRET_PRIVATE_KEY=  

- Edit accounts.txt to store the addresses you want to distribute the tokens to

- In contract.js replace the ABI with the ABI from your verified contract in Robsten (you retrieved it in "Create your token" section)  

- Run: ```$node distribute.js```  

## Using Docker ##
- Install Docker: https://hub.docker.com/  
check to see if you have Docker installed: ``` docker --version ```  
- Build a docker image: ```$ docker build -t blockchain/km .```
- Run docker image: ```$docker run --name distribute blockchain/km```

## Additional Docker Commands ##

- Check what docker containers are running: ```$docker ps```
- Check what images I have built: ``` $docker image ls ```
- Remove all docker images/networks etc: ```$docker system prune -a -f```
- Kill a running docker container: ```$docker kill <container name>```

### Docker Compose ###

Run: ```$docker-compose up```

### Docker Hub ###

- Run ```$docker pull amjo92/kittymeow-blockchain```
- Run ```$docker run --name distribute amjo92/kittymeow-blockchain```

### Making Docker available on Docker Hub ###

- Create a repository in your Docker hub account
- Build your Docker image.  
Run ```$docker build -t <username/repo-name> .```  
Run ```$docker build -t amjo92/kittymeow-blockchain .``` 

- Test your Docker image locally.  
Run ```$docker run <username/repo-name> --name <container-name>```  
Run ```$docker run amjo92/kittymeow-blockchain --name distribute```

- Push your Docker image to Docker Hub.
Run ```$docker push <username/repo-name>```  
Run ```$docker push amjo92/kittymeow-blockchain```