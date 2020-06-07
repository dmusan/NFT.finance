import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Blockie } from "rimble-ui";
import { EthAddress } from "rimble-ui";

import '../../../../css/mystyles.css'
import { approveNFT } from '../../../../services/web3/loansNFTContract'
import { createLoanRequest } from '../../../../services/web3/loansNFTContract'

// TODO: Rename to NewLeaseOfferModalContent
class NewLoanRequestModalContent extends Component {

    // State will get be filled with changes to input components
    state = {
        loanAmount: '',
        interestAmount: '',
        singlePeriodTime: '',
        maximumInterestPeriods: ''
    }

    handleChange = (evt) => {
      this.setState({ [evt.target.name]: evt.target.value });
    }

    approveNFT = (e) => {
      e.preventDefault();
      approveNFT(
        this.props.nft.asset_contract.address,
        this.props.userAddress,
        this.props.nft.token_id
      );
    }

    newLoanRequest = (e) => {
      e.preventDefault();
      createLoanRequest(
        this.props.userAddress,
        this.props.nft.asset_contract.address,
        this.props.nft.token_id,
        this.state.loanAmount,
        this.state.interestAmount,
        this.state.singlePeriodTime,
        this.state.maximumInterestPeriods
      );
    }

    render() {
      return (
        <div className="container">
          <h5 className="card-asset-content">
            <p>Specify the details for your loan request.</p>
            <p>Your selected NFT will be used as collateral.</p>
          </h5>
          <div className="left-align">
            <p><b className="input-margins">NFT name:</b> {this.props.nft.name}</p>
            <div className="row">
              <div className="col s1 m1">
                <b>NFT address: </b>
              </div>
              <div className="col s1 m1">
              </div>
              <div className="col s10 m10 right-align">
                <EthAddress address={this.props.nft.asset_contract.address} />
              </div>
            </div>
            <form>
              <div>
                <b className="input-margins">Loan Amount:</b>
                <div class="input-field inline">
                  <input id="loan_amount" type="text" name="loanAmount" onChange={this.handleChange} />
                  <label htmlFor="loan_amount">Amount in ETH</label>
                </div>
              </div>
              <div>
                <b className="input-margins">Interest Amount:</b>
                <div class="input-field inline">
                  <input id="interest_amount" type="text" name="interestAmount" onChange={this.handleChange} />
                  <label htmlFor="interest_amount">Amount in ETH</label>
                </div>
              </div>
              <div>
                <b className="input-margins">Length of one interest period:</b>
                <div class="input-field inline">
                  <input id="lease_period" type="text" name="singlePeriodTime" onChange={this.handleChange} />
                  <label htmlFor="lease_period">Days for one period</label>
                </div>
              </div>
              <div>
                <b className="input-margins">Maximum number of interest periods:</b>
                <div class="input-field inline">
                  <input id="interest_periods" type="text" name="maximumInterestPeriods" onChange={this.handleChange} />
                  <label htmlFor="interest_periods">Max</label>
                </div>
              </div>
            </form>
            <div className="row">
                <button className="btn indigo lighten-1 button-offer" onClick={ this.approveNFT }>1. Approve Transfer</button>
            </div>
            <div className="row">
                <button className="btn indigo lighten-1 button-offer" onClick={ this.newLoanRequest }>2. Create Offer</button>
            </div>
          </div>
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
