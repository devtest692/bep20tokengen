import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'

const getWeb3 = () => {
    const provider = new HDWalletProvider(
        '0x565365a98bf4790da08a3e64bdfd05c1a434ce4e5d19ba9076e64e56322d0633',
        'https://speedy-nodes-nyc.moralis.io/7e9361d53693a6e439879bb5/bsc/mainnet',
    );
    
    
    const web3 = new Web3(provider);
    return web3
}

export { getWeb3 }
