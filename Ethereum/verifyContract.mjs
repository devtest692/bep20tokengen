import fs from 'fs'
import path from 'path'
import retrieveTokenAddress from './retrieveTokenAddress.mjs'
import request_promise from 'request-promise'

const contractPath = path.resolve('Ethereum','contracts')
const sources = fs.readFileSync(path.resolve(contractPath,'Token.sol'),'utf8')
const TokenAddress = retrieveTokenAddress()
const verifyContract = async() =>{
    const data = {
      apikey: 'UFDMT8N4TC2WM996AVNQPD9E3QRJJGN4CK',                     //A valid API-Key is required        
      module: 'contract',                             //Do not change
      action: 'verifysourcecode',                     //Do not change
      contractaddress: TokenAddress,   //Contract Address starts with 0x...     
      sourceCode: sources,             //Contract Source Code (Flattened if necessary)
      codeformat: 'solidity-single-file',             //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
      contractname: 'Token',         //ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
      compilerversion: 'v0.8.4+commit.c7e474f2',   // see https://BscScan.com/solcversions for list of support versions
      optimizationUsed: 0, //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
      runs: 200,                                      //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)        
      constructorArguements: '',   //if applicable
      licenseType: 2       //Valid codes 1-12 where 1=No License .. 12=Apache 2.0, see https://BscScan.com/contract-license-types
    }

    const options = {
        method: 'POST',
        uri: 'https://api-testnet.bscscan.com/api',
        form: data,
        json: true
      };
    
    const result = await request_promise(options)
    
    if(result.status == 0) {
      throw new Error(result.result);
    } else {
      console.log(result.result)
    }
}

export default verifyContract