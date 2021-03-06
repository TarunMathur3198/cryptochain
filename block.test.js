const Block = require("./block");
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

// first argument string, second argument callback function
describe('Block',()=>{
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain','data'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp,lastHash,hash,data,nonce,difficulty});

 
    // const block = new Block({
    //     timestamp: timestamp,
    //     lastHash: lastHash,
    //     hash: hash,
    //     data: data
    // });
// above is the generic format, but in javascript if the key and the value are same in an object we can shorten the syntax
// which essentially means you only have to specify fields once
// the key is automatically used and the value is whatever value is stored as in the local variable for that actual keyword


    // const block = new Block({
    //     timestamp: timestamp,
    //     lastHash: lastHash,
    //     hash: hash,
    //     data: data
    // });

    it('has a timestamp, lastHash, hash, and data property', ()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);



    })

    describe('genesis()',()=>{
        const genesisBlock = Block.genesis();

        console.log('genesisBlock',genesisBlock);

        it('returns a block instance',()=>{
                expect(genesisBlock instanceof Block).toBe(true);
        //        console.log('genesisBlock',genesisBlock);

        });

        it('returns the genesis data',()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });



    });

    describe('mineBlock()',()=>{
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock,data});
        
        
        it('returns a Block instance',()=>{
            expect(minedBlock instanceof Block).toEqual(true);
        });

        it('sets the `lastHash` to be the `hash` of the lastBlock',()=>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`',()=>{
            expect(minedBlock.data).toEqual(data);
        });

        it('sets the `timestamp`',()=>{
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('Creates a sha -256 `hash` based on the proper inputs',()=>{
            expect(minedBlock.hash)
                .toEqual(
                    cryptoHash(
                    minedBlock.timestamp, 
                    minedBlock.nonce,
                    minedBlock.difficulty,
                    lastBlock.hash,
                    data
                    )
                );
        });


        it('sets a `hash` that matches the difficulty criteria',()=>{
            expect(minedBlock.hash.substring(0,minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty));
        })

    });

})