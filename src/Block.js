import SHA from 'sha256'

export default class Block{
    constructor(index,nonce,lasthash,hash,transactions){
        this.index = index;        
        this.transactions = transactions;
        this.nonce = nonce;
        this.lasthash = lasthash;
        this.hash = hash;
        this.timestamp = Date.now();
    }

    

    static genesis(){
        return new this(0,0,"","",[100]) 
    }

    
    static hash(prevHash,blockData,nonce){
        let curHash = JSON.stringify(blockData)
        return SHA(`${prevHash}${nonce}${curHash}`)
    }

    toString(){
        return `${this.hash}`
    }

}