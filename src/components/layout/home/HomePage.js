import React, { Component } from 'react'
import { connect } from 'react-redux'
import Web3 from 'web3'
import HomeCard from './HomeCard'
import '../../../css/mystyles.css'

class HomePage extends Component {

  componentDidMount() {
    window.ethereum.enable().then( accounts =>
      this.props.addUserAddress(accounts[0].toLowerCase()),
    );
  }

  render() {
    return (
      <div className="valign-wrapper vertical-wrapper">
        <HomeCard />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserAddress: (userAddress) => { dispatch({'type': 'ADD_USER_ADDRESS', 'userAddress': userAddress}) }
  }
}

export default connect(null, mapDispatchToProps)(HomePage);
