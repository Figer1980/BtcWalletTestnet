///importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin -rede principal -mainnet
//testnet rede de -teste
const network = bitcoin.networks.testnet

//caminho de derivacao
const path = "m/49'/1'/0'/0"

//criando as minemonic para a seed 
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz de carteira HD
let root = bip32.fromSeed(seed, network)


//criando uma conta
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
  }).address

console.log("carteira gerada")
console.log('endereco:',btcAddress)
console.log("chave privada:", node.toWIF())
console.log("seed", mnemonic)
  


