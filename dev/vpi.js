const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require("./blockchain");
const ramroin = new Blockchain(); 
const uuid = require('uuid');
const nodeAddress = uuid.v1().split('-').join('');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Assign an instance or object of express to our app
app.get('/blockchain', function (req, res) {
    res.send('Blockchain endpoint is under construction.');
});

app.post('/transaction', function (req, res) {
    console.log(req.body);
    // res.send(`The amount of the transaction is ${req.body.amount} bitcoin`);
    const blockIndex = ramroin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    // transaction.push(blockIndex);
    res.json({note:`Transaction will be added in block ${blockIndex}.`});



});

app.get('/mine', function (req, res) {
    const lastBlock = ramroin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: ramroin.pendingTransactions,
        index: lastBlock['index']+1};
    const nonce =ramroin.proofOfWork(previousBlockHash,currentBlockData);
    const blockHash = ramroin.hashBlock(previousBlockHash,currentBlockData,nonce);
    const newBlock = ramroin.createNewBlock(nonce,previousBlockHash,blockHash);
    res.json({
        note: "New block mined successfully",block: newBlock

    });
    // ramroin.createNewTransaction(12.5,"00",nodeAddress);
    ramroin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);

});



app.listen(3000, function () {
    console.log('Listening on port 3000');
});
