import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import NavigationBar from './components/NavigationBar'
import DeployContractsForm from './components/DeployContractsForm'
import { fetchWeb3 } from './actions/web3Actions'

import './app.css'

const mapStateToProps = (state) => ({
  web3: state.web3Status.web3,
  currNetwork: state.web3Status.currNetwork,
  currAccount: state.web3Status.currAccount,
  truncatedAccount: state.web3Status.truncatedAccount
  })

class App extends Component {
  constructor(props) {
    super(props)
    this.fetchWeb3 = this.fetchWeb3.bind(this)
  }
  
  componentDidMount() {
    setInterval(
      () => this.fetchWeb3(), 1500
    )
  }

  fetchWeb3() {
    this.props.dispatch(fetchWeb3(this.props))
  }

  render() {
    return (
    <div className="App">
      <NavigationBar network={this.props.currNetwork} truncatedAccount={this.props.truncatedAccount}/>
      <Container fluid={true} className="mainContainer">
        <Row>
        <Col xs="12">
        <DeployContractsForm web3={this.props.web3} network={this.props.currNetwork} account={this.props.currAccount} />
        </Col>
        </Row>
      </Container>
    </div>
    )
  } 
}

export default connect(mapStateToProps)(App)