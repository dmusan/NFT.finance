import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Blockie, EthAddress } from "rimble-ui";
import M from "materialize-css";

import { approveNFT, createLoanRequest } from '../../../../services/web3/loansNFTContract'

class NewLoanRequestModalContent extends Component {

    componentDidMount() {
      var elems = document.querySelectorAll('input[type=range]');
      var instances = M.Modal.init(elems);
    }


    state = {
        loanAmount: '',
        interestAmount: '',
        singlePeriodTime: '31',
        maximumInterestPeriods: '12'
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
          <h4 className="card-asset-content indigo-text text-darken-2 card-asset-content">
            New Loan Request with your NFT as collateral
          </h4>
          <div className="left-align">
            <p><b className="input-margins">NFT name</b></p><p> {this.props.nft.name}</p>
            <div className="row">
              <div className="col s6 m6">
                <b>NFT address</b>
              </div>
              <div className="col s12 m12 right-align">
                <EthAddress address={this.props.nft.asset_contract.address} />
              </div>
            </div>
            <form>
              <div>
                <b className="input-margins">Loan Amount</b>
                <div className="input-field">
                  <input id="loan_amount" type="text" name="loanAmount" onChange={this.handleChange} />
                  <label htmlFor="loan_amount">Amount in ETH</label>
                </div>
              </div>
              <div>
                <b className="input-margins">Interest Amount</b>
                <div className="input-field">
                  <input id="interest_amount" type="text" name="interestAmount" onChange={this.handleChange} />
                  <label htmlFor="interest_amount">Amount in ETH</label>
                </div>
              </div>
              <div>
                <b className="input-margins">Length of one interest period: </b> {this.state.singlePeriodTime} days
                <div className="range-field">
                  <input type="range" name="singlePeriodTime" id="single_period" min="1" max="31" onChange={this.handleChange} />
                </div>
              </div>
              <br />
              <div>
                <b className="input-margins">Maximum number of interest periods: </b> {this.state.maximumInterestPeriods}
                <div className="range-field">
                  <input type="range" name="maximumInterestPeriods" id="interest_periods" min="1" max="12" onChange={this.handleChange} />
                </div>
              </div>
            </form>
            <div className="row">
                <button className="btn indigo lighten-1 button-offer right" onClick={ this.approveNFT }><i class="material-icons left">looks_one</i> Approve Transfer</button>
            </div>
            <div className="row">
                <button className="btn indigo lighten-1 button-offer right" onClick={ this.newLoanRequest }><i class="material-icons left">looks_two</i> Create Request</button>
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
