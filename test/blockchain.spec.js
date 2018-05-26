import {expect} from "chai";
import Blockchain from './../src/Blockchain';
import Block from './../src/Block';

describe("Blockchain test",()=>{
    let bc,tx1,tx2;

    beforeEach(()=>{
        bc = new Blockchain()
        tx1 = {from:"john", to:"nana", amount:4000 }
        tx2 = {from:"james", to:"john", amount:8000 }
    })
    
    it("should create a block chain",()=>{
        expect(bc).to.have.all.keys('chain','pendingTransactions') 
        expect(bc.chain).to.have.lengthOf(1)       
    })
    
    it("should create transaction",()=>{
        const {from,to,amount } = tx1 
        bc.createTransaction(from,to,amount)
        expect(bc.pendingTransactions).to.have.lengthOf(1);
        //console.log(bc.pendingTransactions)
    })

    it("should add a new block",()=>{
        const {from,to,amount } = tx1 
        const {from:ftx2,to:ttx2,amount:atx2 } = tx2
        
        bc.createTransaction(from,to,amount)
        bc.createTransaction(ftx2,ttx2,atx2)
        bc.addBlock(bc.pendingTransactions)
        expect(bc.chain).to.have.lengthOf(2);
        //console.log(bc.chain)
        
    })

    it("proof of work should yield a number as nonce", ()=>{
        const prevHash= "some random string"
        const blockData = [{from:"john"}, {from:"james"}]
        const nonce= bc.proofOfWork(prevHash,blockData);
        expect(nonce).to.be.a('number') 
        const hash =  Block.hash(prevHash,blockData,nonce)
        expect(hash.substr(0,4)).to.be.equal("0000")
        console.log(nonce)

    } )


})