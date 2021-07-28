import path from 'path'
import fs from 'fs'


const TokenPath = path.resolve('Ethereum','TokenAddress');

const retrieveTokenAddress = () => {
    const tokenFile = fs.readFileSync(path.resolve(TokenPath, 'Token.json'))
    const tokenJson = JSON.parse(tokenFile)
    const tokenAddress = tokenJson.Address
    return tokenAddress
}

export default retrieveTokenAddress
