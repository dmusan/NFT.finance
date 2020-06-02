import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Blockie } from "rimble-ui";
import { EthAddress } from "rimble-ui";

import '../../../../css/mystyles.css'
import { approveNFT } from '../../../../services/web3/leaseNFTContract'

class NewLeaseOfferCard extends Component {

  // State will get be filled with changes to input components
  state = {
      collateralAmount: '',
      leasePrice: '',
      leasePeriod: '',
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

  render() {
    return (
      <div className="container">
        <h5 className="card-asset-content">
          Specify the details for lending your NFT
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
              <b className="input-margins">Collateral Amount:</b>
              <div class="input-field inline">
                <input id="collateral_amount" type="text" name="collateralAmount" onChange={this.handleChange} />
                <label htmlFor="collateral_amount">Amount in ETH</label>
              </div>
            </div>
            <div>
              <b className="input-margins">Price to lease:</b>
              <div class="input-field inline">
                <input id="lease_price" type="text" name="leasePrice" onChange={this.handleChange} />
                <label htmlFor="lease_price">Amount in ETH</label>
              </div>
            </div>
            <div>
              <b className="input-margins">Lease Period:</b>
              <div class="input-field inline">
                <input id="lease_period" type="text" name="leasePeriod" onChange={this.handleChange} />
                <label htmlFor="lease_period">Max days for lease</label>
              </div>
            </div>
          </form>
          <div className="row">
              <button className="btn indigo lighten-1 button-offer" onClick={ this.approveNFT }>1. Approve Transfer</button>
          </div>
          <div className="row">
              <button className="btn indigo lighten-1 button-offer" onClick={ this.approveNFT }>2. Create Offer</button>
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
