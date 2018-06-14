export const MAIN_NETWORK_ID = "1"
export const MORDEN_NETWORK_ID = "2"
export const ROPSTEN_NETWORK_ID = "3"
export const RINKEBY_NETWORK_ID = "4"
export const KOVAN_NETWORK_ID = "42"

export const RIGHT_NETWORK_IDS = [ROPSTEN_NETWORK_ID]
export const METAMASK_NOT_FOUND = 0

const path = require('path')
const fs = require("fs")
var Web3 = require('web3')
var networkConstants = require('./ropstenConstants.json')

export const NETWORK_TOKENS = networkConstants['tokens']
export var RESERVE_TOKENS = {}

Object.keys(NETWORK_TOKENS).forEach(function(key) {
    RESERVE_TOKENS[key] = false
})
delete RESERVE_TOKENS['ETH']

//export const CONVERSION_RATES_CONTRACT_ABI = require('../../build/contracts/PeaceRelay.json').abi;

export const GAS_PRICE_GWEI = 30

const contractPath = path.join(__dirname, "../contracts/");
export const SOLC_COMPILATION_INPUT = {
  "ConversionRatesInterface.sol" : fs.readFileSync(contractPath + 'ConversionRatesInterface.sol', 'utf8'),
  "ConversionRates.sol" : fs.readFileSync(contractPath + 'ConversionRates.sol', 'utf8'),
  "PermissionGroups.sol" : fs.readFileSync(contractPath + 'PermissionGroups.sol', 'utf8'),
  "ERC20Interface.sol" : fs.readFileSync(contractPath + 'ERC20Interface.sol', 'utf8'),
  "SanityRatesInterface.sol" : fs.readFileSync(contractPath + 'SanityRatesInterface.sol', 'utf8'),
  "ExpectedRateInterface.sol" : fs.readFileSync(contractPath + 'ExpectedRateInterface.sol', 'utf8'),
  "SanityRates.sol" : fs.readFileSync(contractPath + 'SanityRates.sol', 'utf8'),
  "ExpectedRate.sol" : fs.readFileSync(contractPath + 'ExpectedRate.sol', 'utf8'),
  "Utils.sol" : fs.readFileSync(contractPath + 'Utils.sol', 'utf8'),
  "FeeBurnerInterface.sol" : fs.readFileSync(contractPath + 'FeeBurnerInterface.sol', 'utf8'),
  "VolumeImbalanceRecorder.sol" : fs.readFileSync(contractPath + 'VolumeImbalanceRecorder.sol', 'utf8'),
  "FeeBurner.sol" : fs.readFileSync(contractPath + 'FeeBurner.sol', 'utf8'),
  "WhiteListInterface.sol" : fs.readFileSync(contractPath + 'WhiteListInterface.sol', 'utf8'),
  "KyberNetwork.sol" : fs.readFileSync(contractPath + 'KyberNetwork.sol', 'utf8'),
  "WhiteList.sol" : fs.readFileSync(contractPath + 'WhiteList.sol', 'utf8'),
  "KyberReserveInterface.sol" : fs.readFileSync(contractPath + 'KyberReserveInterface.sol', 'utf8'),
  "Withdrawable.sol" : fs.readFileSync(contractPath + 'Withdrawable.sol', 'utf8'),
  "KyberReserve.sol" : fs.readFileSync(contractPath + 'KyberReserve.sol', 'utf8'),
  "Wrapper.sol" : fs.readFileSync(contractPath + 'mockContracts/Wrapper.sol', 'utf8')
}