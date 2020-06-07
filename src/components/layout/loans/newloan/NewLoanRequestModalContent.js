import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Blockie } from "rimble-ui";
import { EthAddress } from "rimble-ui";

import '../../../../css/mystyles.css'
import { approveNFT, lendNFT } from '../../../../services/web3/leaseNFTContract'

// TODO: Rename to NewLeaseOfferModalContent
class NewLoanRequestModalContent extends Component {

  // State will get be filled with changes to input components
  state = {
      collateralAmount: '',
      leasePrice: '',
      leasePeriod: '',
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }


  render() {
    return (
      <div className="container">
      Test
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.account.accountAddress.address
  }
}

export default connect(mapStateToProps)(NewLoanRequestModalContent);
