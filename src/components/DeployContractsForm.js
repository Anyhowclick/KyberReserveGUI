import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { ROPSTEN_NETWORK_ID, RESERVE_TOKENS } from './Constants';
import DeployStatus from './DeployStatus'
import DeployReserveContracts from './DeployReserveContracts'

const web3Utils = require("web3-utils");

const mapStateToProps = (state) => ({
  web3: state.web3Status.web3, //version 0.20.6
  currNetwork: state.web3Status.currNetwork,
  currAccount: state.web3Status.currAccount,
  })

class DeployContractsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reserveTokens: RESERVE_TOKENS,
      withdrawalAddress: [],
      adminAddress: [],
      operatorAddress: [],
      validDurationBlock: 500,
    }
    this.handleTokenChange = this.handleTokenChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleGenericChange = this.handleGenericChange.bind(this)
  }

  handleAddressChange(event) {
    let address = event.target.value
    let isValidAddressClassName
    if (web3Utils.isAddress(address)) {
      address = web3Utils.toChecksumAddress(address)
      isValidAddressClassName = web3Utils.checkAddressChecksum(address) ? "is-valid form-control" : "is-invalid form-control"
    } else {
      isValidAddressClassName = "is-invalid form-control"
    }
    var name = event.target.name
    this.setState({[name]: [address,isValidAddressClassName]})
  }

  handleTokenChange(event) {
    let tokenName = event.target.name
    const reserveTokens = this.state.reserveTokens
    reserveTokens[tokenName] = !reserveTokens[tokenName]
    this.setState({reserveTokens})
  }

  handleGenericChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const currNetwork = this.props.network;
    if (currNetwork == ROPSTEN_NETWORK_ID) {
      return (
      <Row className="deploymentForm">
        <Col xs="6">
        <Form>
          <h3>Select Your Reserve Tokens</h3>
          <div>
          {Object.entries(this.state.reserveTokens).map(reserveToken => 
            <FormGroup check inline key={reserveToken[0]}>
            <Label check>
            <Input type="checkbox" name={reserveToken[0]} onChange={this.handleTokenChange}/>
            {reserveToken[0]}
            </Label>
            </FormGroup>
          )} 
          </div>
          <hr />
          <h3>Withdrawal Wallet Address</h3>
          <Input name="withdrawalAddress" className={this.state.withdrawalAddress[1]} onChange={this.handleAddressChange}/>
          <br />
          <h3>Admin Wallet Address</h3>
          <Input name="adminAddress" className={this.state.adminAddress[1]} onChange={this.handleAddressChange}/>
          <br />
          <h3>Operator Wallet Address</h3>
          <Input name="operatorAddress" className={this.state.operatorAddress[1]} onChange={this.handleAddressChange}/>
          <br />
          <h3>Valid Duration Block</h3>
          <Input type="number" name="validDurationBlock" value={this.state.validDurationBlock} onChange={this.handleGenericChange}/>
          <br />
          <DeployReserveContracts
          reserveTokens={this.state.reserveTokens}
          withdrawalAddress={this.state.withdrawalAddress[0]}
          adminAddress={this.state.adminAddress[0]}
          operatorAddress={this.state.operatorAddress[0]}
          validDurationBlock={this.state.validDurationBlock}
          />
      </Form>
      </Col>
      <Col xs="6">
      <DeployStatus />
      </Col>
      </Row>
      );

    } else {
      return (
      <Jumbotron>
        <h1>Wrong network</h1>
      </Jumbotron>
      )
    }
  }
}

export default connect(mapStateToProps)(DeployContractsForm)
