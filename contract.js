// this file will enable interaction with our smart contract
// we're going to read values from it
// and we're going to create transactions to write to it

// we want the following details
//  - an infura token
//  - a contract address
//  - an owner address
//  - a private key for the owner address (because we're going to sign txs)

// we want to access our deployed smart contract
// and pull back the name, symbol, and the owner balance 
// all these are read-only methods and so shouldn't involve
// creating a transaction

const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

require('dotenv').config();

infuraToken = process.env.INFURA_TOKEN;
contractAddress = process.env.CONTRACT_ADDRESS;
ownerAddress = process.env.OWNER_ADDRESS;
privateKey = Buffer.from(process.env.SUPER_SECRET_PRIVATE_KEY, 'hex');

//console.log(`infura token loaded: ${infuraToken}`);

// https://ropsten.infura.io/v3/d46d3ae31c304b42813094d18609519e

const rpcURL = "https://ropsten.infura.io/v3/" + infuraToken

console.log(`infura URL: ${rpcURL}`);

const web3 = new Web3(rpcURL);

console.log("we are connected to web3");

// load in contract's ABI
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

// create an instance of a contract object that
// - obeys the ABI
// - is at the address of our deployed contract
const contract = new web3.eth.Contract(abi, contractAddress);

console.log("connected to contract via web3");

const getName = async() => {
    let name = await contract.methods.name().call();
    console.log(`name is ${name}`);
    return name;
}

const getSymbol = async() => {
    let symbol = await contract.methods.symbol().call();
    console.log(`symbol is ${symbol}`);
    return symbol;
}

const getDecimals = async() => {
    let decimals = await contract.methods.decimals().call();
    console.log(`decimals is ${decimals}`);
    return decimals;
}

const getTotalSupply = async() => {
    let totalsupply = await contract.methods.totalSupply().call();
    console.log(`totalsupply is ${totalsupply}`);
    return totalsupply;
}

const getBalance = async(address) => {
    let balance = await contract.methods.balanceOf(address).call();
    console.log(`balance of ${address} address is ${balance}`);
    return balance;
}

const transferToken = async(fromAddress, toAddress, amount) => {
    // to create an Eth transaction
    // we need a private key to sign the tx
    // we also need a nonce (counter) to prevent tx replays

    const nonce = await web3.eth.getTransactionCount(fromAddress);
    console.log(`nonce of ${nonce} for address ${fromAddress}`)

    const txObject = {
        nonce: web3.utils.toHex(nonce),
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        to: contractAddress,
        data: contract.methods.transfer(toAddress, amount).encodeABI()
    }

    const tx = new Tx(txObject, {chain: 'ropsten', hardfork: 'petersburg'});

    tx.sign(privateKey);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    console.log("about to send tx");
    let txResponse = await web3.eth.sendSignedTransaction(raw);

    console.log(`tx sent. block number is ${txResponse.blockNumber}`);
    console.log(`tx sent. tx hash is ${txResponse.transactionHash}`);   
}

// const getAllContractInfo = async() => {
//     getName();
//     getSymbol();
//     getDecimals();
//     getTotalSupply();
//     getBalance(ownerAddress);
//     transferToken(ownerAddress, '0x5ef5090b5701CE6E36939eddE4bD4D30966f2604', 23000);
// }

// getAllContractInfo()

module.exports = {getName, getSymbol, getBalance, getDecimals, getTotalSupply, transferToken}



