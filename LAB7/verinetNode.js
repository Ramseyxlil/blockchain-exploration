const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require("./blockchain");
const ramroin = new Blockchain(); 
const uuid = require('uuid');
const nodeAddress = uuid.v1().split('-').join('');
const port = process.argv[2]
const cors = require('cors'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Assign an instance or object of express to our app
app.get('/blockchain', function (req, res) {
    res.send(ramroin)
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


app.post('/register-and-broadcast-node',function(req,res){
    const newNodeUrl = req.body.NewNodeUrl;
    if(ramroin.networkNodes.indexOf(newNodeUrl)== -1)
    ramroin.networkNodes.push(newNodeUrl);
    const regNodesPromises = [];
    ramroin.networkNodes.forEach(networkNodeUrl=>{
        const requestOptions = {
            url: networkNodeUrl + '/register-node',
            method: 'POST',
            body: {newNodeUrl: newNodeUrl},
            json:true
        };
        regNodesPromises.push(rp(requestOptions));

    });
    Promise.all;;(regNodesPromises)
    .then(data=>{

        const bulkRegisterOptions = {
            url: networkNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {allNetworkNodes: [...ramroin.networkNodes,ramroin.currentNodeUrl]},
            json:true
        };
        return rp(bulkRegisterOptions);


})
then(data =>{
    res.json({note: 'New node registered with network successfully'})
});

});

app.post('/register-node',function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = ramroin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = ramroin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode)
        ramroin.networkNodes.push(newNodeUrl);

    res.json({note: 'New node registered successfully'});
});

app.post('/register-node-bulk',function (req,res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl =>{
        const nodeNotAlreadyPresent = ramroin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = ramroin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) ramroin.networkNodes.push(networkNodeUrl);
    });
    res.json({note: 'Bulk registration successfull'})

});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

