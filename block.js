const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = this.nonce;
        this.difficulty = this.difficulty;
    
    }

    static genesis(){
        return new this(GENESIS_DATA);
        //return new Block(GENESIS_DATA); // This also works
    }

    static mineBlock({lastBlock, data}){
        const timestamp= Date.now();
        const lastHash = lastBlock.hash;
        const{difficulty} = lastBlock;
        let nonce = 0;
/*
        do{
            nonce++;
            timestamp= Date.now();
            hash = cryptoHash(timestamp,lastHash,data,nonce,difficulty);
        }while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));
  */      

        return new this({
            timestamp,
            lastHash,
            data,
            difficulty,
            nonce,
            hash : cryptoHash(timestamp,lastHash,data,nonce,difficulty)
        });
    }



}

module.exports = Block;