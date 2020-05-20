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

  getOfferAsset(tokenIdNFT, contractAddress) {
    // maybe change to state
    const loadingAsset = {"image_url": "loadingImage", "name": "loadingAsset", "permalink": "https://opensea.io/assets", "description": "Loading Asset"};
    const assets = this.props.assetsForOffers.filter(offerAsset =>
      offerAsset.token_id == tokenIdNFT && offerAsset.asset_contract.address == contractAddress);

    if (assets.length > 0) {
      return assets[0];
    } else return loadingAsset;
  }

  render() {
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
                <p>Max Lending Time Stamp: {this.props.offer.maxLendingTimeStamp}</p>
              </div>
              <div class="card-action">
                <a href='/'>Cancel</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    assetsForOffers: state.assetsForOffers
  }
}

export default connect(mapStateToProps) (SingleOrder);
