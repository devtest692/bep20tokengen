
import fs from 'fs'
import fs_extra from 'fs-extra'
import path from 'path'
import contractManager from './contractManager.mjs';
import { getWeb3 } from './getWeb3.mjs'
import writeAddress from './writeAddress.mjs'

const web3 = getWeb3()



const buildPath = path.resolve('Ethereum','build');  


const deploySC = async(name,symbol,decimals,supply,tax,owner) => {
    
    const contractFile = fs.readFileSync(path.resolve(buildPath, 'CoinToken.json'))
    const contractJson = JSON.parse(contractFile)

    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy from account: ${accounts[0]}`);

    const deployedContract = await new web3.eth.Contract(contractJson.abi)
        .deploy({
            data: '0x' + contractJson.bytecode,
            arguments: [name,symbol,decimals,supply,tax,"0",owner,owner] 
        })
        .send({
            from: accounts[0],
            gas: '8000000'
        })

    console.log(
        `Contract deployed at address: ${deployedContract.options.address}`
    );
    writeAddress(deployedContract.options.address)
}



export default deploySC



