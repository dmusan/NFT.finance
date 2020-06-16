import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from "materialize-css"
import SingleLeaseOffer from './SingleLeaseOffer'

// TODO: move consts
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

  filterSelectedOptionStatus = (leaseOffer) => {
    // TODO change when updating smart contract. Maybe this doesn't have to be updated?
    return leaseOffer.status === this.props.selectedOptionStatus;
  }

  getNFTAsset = (offer) => {
    const assets = this.props.allLeaseAssets.filter((offerAsset) => {
      try {
        return offerAsset.token_id === offer.tokenIdNFT
          && offerAsset.asset_contract.address === offer.smartContractAddressOfNFT
        } catch(error) {
          console.log("offer asset is: " + JSON.stringify(offerAsset));
        }
      }
    )
    if (assets.length > 0) {
      return assets[0];
    }
    return LOADING_ASSET;
  }

  render() {
    const filteredLeaseOffers =
                  this.props.allLeaseOffers.filter(this.filterLender)
                                           .filter(this.filterBorrower)
                                           .filter(this.filterSelectedOptionStatus);

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
