import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { newTxStatus, updateTxStatus, removeTxStatus } from '../actions/txStatusActions'
import { GAS_PRICE_GWEI, SOLC_COMPILATION_INPUT } from './Constants'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const web3Utils = require("web3-utils")
const web3Eth = require("web3-eth")
const BigNumber = require('bignumber.js')
const solc = require('solc')

const mapStateToProps = (state) => ({
  web3: state.web3Status.web3,
  currAccount: state.web3Status.currAccount
  })

class DeployReserveContracts extends Component {
  constructor(props) {
    super(props);
    this.createNewTxStatus = this.createNewTxStatus.bind(this)
    this.updateTxStatus = this.updateTxStatus.bind(this)
    this.removeTxStatus = this.removeTxStatus.bind(this)
  }

  createNewTxStatus(id,msg) {
    this.props.dispatch(newTxStatus(id,msg))
  }

  updateTxStatus(id,msg) {
    this.props.dispatch(updateTxStatus(id,msg))
  }

  removeTxStatus(id) {
    this.props.dispatch(removeTxStatus(id))
  }

  async main() {
    const account = this.generateEthAccount()
    const sender = account.address
    const gasPrice = BigNumber(GAS_PRICE_GWEI).mul(10 ** 9);
    const signedTxs = [];
    let nonce;
    let txID = new Date().getTime()
    await this.compileContractInfo(txID)

  }

  generateEthAccount() {
    const rand = web3Utils.randomHex(80)
    const privateKey = web3Utils.sha3("js sucks" + rand)
    console.log("privateKey", privateKey)
    return web3Eth.accounts.privateKeyToAccount(privateKey);
  }

  async compileContractInfo(txID) {
    this.createNewTxStatus(txID,"Starting contract compilation....")
    const output = await solc.compile({ sources: SOLC_COMPILATION_INPUT }, 1);
    this.updateTxStatus(txID, "Finished contract compilation")
  }

  render() {
    return (
    <Button color="success" onClick={this.main()}>Deploy Contracts!</Button>
    )
  }
}

export default connect(mapStateToProps)(DeployReserveContracts)