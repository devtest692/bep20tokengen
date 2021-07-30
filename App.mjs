import contractManager from './Ethereum/contractManager.mjs'
import deploySC from './Ethereum/deploySC.mjs'
import retrieveTokenAddress from './Ethereum/retrieveTokenAddress.mjs'
import express from 'express'
import cors from 'cors'
import compileContracts from './Ethereum/compile.mjs'
import verifyContract from './Ethereum/verifyContract.mjs'


const app = express()
const port = 8080

app.use(cors())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());



app.post('/create', (req,res) => {
  const solidity_text = contractManager(
                          req.body.token_name,
                          req.body.token_symbol,
                          req.body.decimals,
                          req.body.init_supply,
                          req.body.trx_tax,
                          req.body.custom_owner
                        )
  console.log(solidity_text)

  res.send("File successfully written")
})


app.get('/compile', (req, res) => {
    compileContracts()
    res.send("Compilation Successful")
})

app.post('/deploy', (req,res) => {
  console.log(req.body)

  deploySC(                         
    req.body.token_name,
    req.body.token_symbol,
    req.body.decimals,
    req.body.init_supply,
    req.body.trx_tax,
    req.body.custom_owner)

    res.send("Token Address stored")

})

app.get('/verify', (req,res) => {
  verifyContract()
  res.send("verification requested")
})

app.get('/fetchAddress', (req,res) => {
    const TokenAddress = retrieveTokenAddress()
    const resp_json = JSON.stringify({"token":TokenAddress})
    res.send(resp_json)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })