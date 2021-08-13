import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'

const getWeb3 = () => {
    const provider = new HDWalletProvider(
        'de8a5ab4e3293b574b34cab2055610b9f705e38aeb7794222235f55126aaa918',
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
    );
    
    
    const web3 = new Web3(provider);
    return web3
}

export { getWeb3 }
