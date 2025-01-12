const Blockchain = require('./blockchain');

// Create a new instance of Blockchain
const izuafaabdulrafiuvugsen227708 = new Blockchain();

// Define a sample previous block hash
const previousBlockHash = '20985DA6CCF066ASDED38C1D27C35692E13';

// Create a current block representation
const currentBlockData = [{
    amount: 10,
    sender: 'WH3GE9COE5CD5716',
    recipient: '8UY6F6E462D48E9',
}];

// Define the nonce value
const nonce = 100;

// Call the hashBlock method and print the result
const hash = izuafaabdulrafiuvugsen227708.hashBlock(previousBlockHash, currentBlockData, nonce);
console.log("hash is " + hash);
