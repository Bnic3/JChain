
import Block from './Block';

export default class Blockchain{
    constructor(){
        this.chain = [Block.genesis()]
        this.pendingTransactions = [] 
    }

    addBlock(data){
       const chainLength = this.chain.length
       let lastBlock = this.chain[chainLength-1]
       let nonce= this.proofOfWork(lastBlock.hash,data)
       let curHash = Block.hash(lastBlock.hash,data,nonce)
       let newBlock = new Block(chainLength,
                    nonce,
                    lastBlock.hash,
                    curHash,
                    data)
       this.pendingTransactions=[]; //clear pending transactions
       this.chain.push(newBlock);                  

    } 

    createTransaction(from, to, amount ){
        this.pendingTransactions.push({from,to,amount})
    }

    proofOfWork(prevHash, currentBlockData){
        let nonce = 0;
        let hash =  Block.hash(prevHash,currentBlockData,nonce)
        while (hash.substr(0,4)!== '0000'){
            nonce++
            hash =  Block.hash(prevHash,currentBlockData,nonce)
        }

        return nonce

    }

    validateChain(chain){
        //Todo1: check if its the correct genesis block
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        //Todo2: check for the lasthashes
        for (let i=1; i<chain.length; i++){
            const currBlock = chain[i];
            const lastBlock = chain[i-1];

            if (lastBlock.hash !== currBlock.lasthash || 
                currBlock.hash !== Block.hash(currBlock.lasthash,currBlock.transactions,currBlock.nonce)){
                    return false;
                }

        }
        return true;   
    } 

    //Todo: replace chain and validate chain functions

    toString(){
        return `${this.pendingTransactions}`
    }

    
}