import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Blockie, EthAddress } from "rimble-ui";
import M from "materialize-css";

import { approveNFT, lendNFT } from '../../../../services/web3/leaseNFTContract'

class NewLeaseOfferCard extends Component {


  // State will get be filled with changes to input components
  state = {
      collateralAmount: '',
      leasePrice: '',
      leasePeriod: '31',
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

  lendNFTButton = (e) => {
    e.preventDefault();
    lendNFT(
      this.props.userAddress,
      this.props.nft.asset_contract.address,
      this.props.nft.token_id,
      this.state.leasePeriod,
      this.state.collateralAmount,
      this.state.leasePrice
    );
  }

  render() {
    return (
      <div className="container">
        <h4 className="indigo-text text-darken-2 card-asset-content">
          New Lease Offer with your NFT
        </h4>
        <div className="left-align">
          <p><b className="input-margins">NFT name</b></p> <p>{this.props.nft.name}</p>
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
              <b className="input-margins">Collateral Amount</b>
              <div className="input-field">
                <input id="collateral_amount" type="text" name="collateralAmount" onChange={this.handleChange} />
                <label htmlFor="collateral_amount">Amount in ETH</label>
              </div>
            </div>
            <div>
              <b className="input-margins">Price to lease</b>
              <div className="input-field">
                <input id="lease_price" type="text" name="leasePrice" onChange={this.handleChange} />
                <label htmlFor="lease_price">Amount in ETH</label>
              </div>
            </div>
            <div>
              <b className="input-margins">Pick Lease Period: </b> {this.state.leasePeriod} days
              <div id="connect">
                <p className="range-field">
                  <input type="range" name="leasePeriod" id="lease_period" min="1" max="31" onChange={this.handleChange} />
                  <label htmlFor="lease_period">Max days for Leasing</label>
                </p>
              </div>
            </div>
          </form>
          <div className="row">
              <button className="btn waves-effect waves-light indigo lighten-1 button-offer right" onClick={ this.approveNFT }><i class="material-icons left">looks_one</i> Approve Transfer</button>
          </div>
          <div className="row">
              <button className="btn waves-effect waves-light indigo lighten-1 button-offer right" onClick={ this.lendNFTButton }><i class="material-icons left">looks_two</i> Create Offer</button>
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

export default connect(mapStateToProps)(NewLeaseOfferCard);
