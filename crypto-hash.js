// require native crypto module of JS
const crypto = require('crypto');
//(...inputs) used here to combine multiple arguments in single array named input here
const cryptoHash = (...inputs) => {
    //createHash can be used for different types of hashes
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(''));

    return hash.digest('hex');

};

module.exports = cryptoHash;