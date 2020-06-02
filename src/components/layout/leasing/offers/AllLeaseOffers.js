import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from "materialize-css"
import SingleLeaseOffer from './SingleLeaseOffer'

const LOADING_ASSET = {"image_url": "loadingImage", "name": "loadingAsset", "permalink": "https://opensea.io/assets", "description": "Loading Asset"};

class AllLeaseOffers extends Component {

  filterBorrower = (leaseOffer) => {
     if (this.props.offersFilterBorrower === "") {
      return true;
    }
    // TODO change when updating smart contract
    return leaseOffer.borrower === this.props.offersFilterBorrower;
  }

  filterLender = (leaseOffer) => {
    if (this.props.offersFilterLender === "") {
      return true;
    }
    // TODO change when updating smart contract
    return leaseOffer.lender === this.props.offersFilterLender;
  }

  getNFTAsset = (offer) => {
    const assets = this.props.allLeaseAssets.filter(offerAsset =>
      offerAsset.token_id === offer.tokenIdNFT
          && offerAsset.asset_contract.address === offer.smartContractAddressOfNFT
    );
    if (assets.length > 0) {
      return assets[0];
    }
    return LOADING_ASSET;
  }

  render() {
    const filteredLeaseOffers =
                  this.props.allLeaseOffers.filter(this.filterLender)
                                           .filter(this.filterBorrower);

    const filteredLeaseOffersComponents = filteredLeaseOffers.length ? (
      filteredLeaseOffers.map( (leaseOffer) =>
        <SingleLeaseOffer leaseOffer={leaseOffer}
                          nftAsset={this.getNFTAsset(leaseOffer)}
                          userAddress={this.props.userAddress}/>
      )
    ) : (
      <div className="center">No offers to show at the moment.</div>
    )
    return (
      <div className="container">
        {filteredLeaseOffersComponents}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allLeaseOffers: state.leasing.leaseOffers,
    allLeaseAssets: state.leasing.leaseAssets,
    userAddress: state.account.accountAddress.address
  }
}

export default connect(mapStateToProps)(AllLeaseOffers)
