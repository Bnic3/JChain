import {expect} from "chai";
import Block from './../src/Block';




describe("Block test", ()=>{

    it("should create a block with block properties", ()=>{
        const index=1,nonce=1,lasthash="randomhash",transactions=[], hash="currenthash";
        let newBlock = new Block(index,nonce,lasthash,transactions, hash)
        expect(newBlock).to.have.all.keys("index","nonce","lasthash","transactions", "hash","timestamp");
    })

    it("should create a genesis block with default params", ()=>{
        let genesisBlock = Block.genesis()
        console.log(genesisBlock);
        expect(genesisBlock).to.have.deep.property("index", 0);
        expect(genesisBlock).to.have.deep.property("nonce", 0);
        expect(genesisBlock).to.have.deep.property("lasthash", "");
        expect(genesisBlock).to.have.deep.property("transactions", []);
        expect(genesisBlock).to.have.deep.property("hash", "");

    

    })



})