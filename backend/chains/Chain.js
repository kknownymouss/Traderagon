const crypto = require('crypto')
const ethers = require('ethers')

const generateWallet = () => {
    
    // Generate private key
    const id = crypto.randomBytes(32).toString('hex');
    const privateKey = "0x"+id;

    const wallet = new ethers.Wallet(privateKey);
    
    return { privateKey: privateKey, address: wallet.address}
}

module.exports = { generateWallet }