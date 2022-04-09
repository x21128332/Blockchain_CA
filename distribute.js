let fs = require("fs");
let contract = require("./contract.js");
let BigNumber = require("big-number");

require('dotenv').config();


//infuraToken = process.env.INFURA_TOKEN;
contractAddress = process.env.CONTRACT_ADDRESS;
ownerAddress = process.env.OWNER_ADDRESS;
// privateKey = Buffer.from(process.env.SUPER_SECRET_PRIVATE_KEY, 'hex');


// read in a file of accounts DONE
// count the number of accounts DONE
// get the remaining supply belonging to token owner DONE
// get 5% of remaining supply DONE
// loop through accounts running a token transfer of 5%
// divide 5% of remaining supply between the accounts
// collect tea and medals

const doDistro = async() => {

    let distributionAddresses = fs.readFileSync("./accounts.txt", "utf8").split(",");

    console.log(`number of distribution addresses are ${distributionAddresses.length}`);

    let symbol = await contract.getSymbol();
    console.log(`token symbol is ${symbol}`);

    let remainingSupply = await contract.getBalance(ownerAddress);
    let ownerBalance = new BigNumber(remainingSupply);

    let fivepercentOfBalance = ownerBalance.div(20);
    console.log(`five % of remaining supply is ${fivepercentOfBalance}`);

    let numberOfAddresses = distributionAddresses.length;
    let distributionAmount = fivepercentOfBalance.div(numberOfAddresses);

    for (looper = 0; looper < numberOfAddresses; looper++) {
        console.log(`about to distribute ${distributionAmount} ${symbol} to ${distributionAddresses[looper]}`)
        
        let returnValue = await contract.transferToken(ownerAddress, distributionAddresses[looper], distributionAmount);
    }
}

doDistro();