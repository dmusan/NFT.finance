import React, { Component } from 'react'
import { connect } from 'react-redux'
import Web3 from 'web3'
import HomeCard from './HomeCard'
import '../../../css/mystyles.css'
import { getAccountAddress, getAccountAssetAction } from '../../../actions/accountActions'

class HomePage extends Component {

  componentDidMount() {
    this.props.getAccountAddress();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userAddress !== this.props.userAddress) {
      this.props.getAccountAssetAction(this.props.userAddress);
    }
  }


  render() {
    return (
      <div className="valign-wrapper vertical-wrapper">
        <HomeCard />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.account.accountAddress.address,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAccountAddress: () => dispatch(getAccountAddress()),
    getAccountAssetAction: (address) => dispatch(getAccountAssetAction(address))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
