import React, { Component } from 'react'
import { connect } from 'react-redux'

import M from "materialize-css";

class SingleOrder extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        console.log("New Slide");
      }
    };

    function onReady() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, options);
    }

    if (document.readyState !== "loading") {
      onReady(); // Or setTimeout(onReady, 0); if you want it consistently async
    } else {
      document.addEventListener("DOMContentLoaded", onReady);
    }

  }

  getOfferAsset(contractAddress, tokenIdNFT) {
    // maybe change to state
    const loadingAsset = {"image_url": "loadingImage", "name": "loadingAsset", "permalink": "https://opensea.io/assets", "description": "Loading Asset"};

    const assets = this.props.assetsForOffers.filter(offerAsset =>
      offerAsset.token_id === tokenIdNFT && offerAsset.asset_contract.address === contractAddress);

    if (assets.length > 0) {
      return assets[0];
    } else return loadingAsset;
  }

  getAvailableActions() {
    let actions = [];
    if (this.props.offer.lender === this.props.userAddress.address) {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.cancelOffer}>Cancel</a>
        </div>
      );
      if (this.props.offer.borrower != "0x0000000000000000000000000000000000000000") {
        actions.push(
          <div class="card-action">
            <a href='/' onClick={this.cancelOffer}>Request Collateral</a>
          </div>
        );
      }
    } else if (this.props.offer.borrower === this.props.userAddress.address) {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.cancelOffer}>Approve Return</a>
          <a href='/' onClick={this.cancelOffer}>Return NFT</a>
        </div>
      );
    } else {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.cancelOffer}>Borrow</a>
        </div>
      );
    }
    return actions;
  }

  render() {
    const actions = this.getAvailableActions();
    const offerAsset = this.getOfferAsset(this.props.offer.smartContractAddressOfNFT, this.props.offer.tokenIdNFT);
    return (
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">offerAsset.name</div>
          <div class="collapsible-body">
            <div class="card transparent z-depth-0 center-align">
              <div class="card-content black-text">
                <span class="card-title">offerAsset.name</span>
                <br/>
                <p>
                  <img src={offerAsset.image_url} />
                  {offerAsset.description}
                  More info on OpenSea: {offerAsset.permalink}
                </p>
                <br/>
                <p>Lender: {this.props.offer.lender}</p>
                <p>Borrower: {this.props.offer.borrower}</p>
                <p>Collateral Amount: {this.props.offer.collateralAmount}</p>
                <p>Lending Price: {this.props.offer.lendingPrice}</p>
                <p>Lending Period (hours): {this.props.offer.lendinPeriod}</p>
              </div>
              {actions}
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    assetsForOffers: state.assetsForOffers,
    userAddress: state.userAddress,
  }
}

export default connect(mapStateToProps) (SingleOrder);
