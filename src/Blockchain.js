
import Block from './Block';

export default class Blockchain{
    constructor(){
        this.chain = [Block.genesis()]
        this.pendingTransactions = [] 
    }

    addBlock(data){
       const chainLength = this.chain.length
       let lastBlock = this.chain[chainLength-1]
       let nonce= "nonce from proof of work"
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

    toString(){
        return `${this.pendingTransactions}`
    }

    
}