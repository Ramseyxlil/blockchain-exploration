const Blockchain = require("../dev/blockchain");
// test 1 A
const IZUAFABDULRAFIUVUGSEN227708 = new Blockchain();

// veroin.hashBlock();
const previousBlockHash = "87765DA6CCF0668238C1D27C35692E11";

const currentBlockData = [
	{
		amount: 120,
		sender: "ASDB4CEE9C0E5CD571",
		recipient: "321A3F6E462D48E9",
	},
	{
		amount: 20,
		sender: "ASASDDB4CEE9C0E5CD571",
		recipient: "1D45321A3F6E462D48E9",
	},
	{
		amount: 1090,
		sender: "ASDASDB4CEE9C0E5CD571",
		recipient: "23321A3F6E462D48E9",
	},
];

const nonce = 1100;

IZUAFABDULRAFIUVUGSEN227708.hashBlock(previousBlockHash, currentBlockData, nonce);

console.log(
	"\n\nThis is our hash data \n\n",
	IZUAFABDULRAFIUVUGSEN227708.hashBlock(previousBlockHash, currentBlockData, nonce),
	"\n\n"
);
