import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

class GetOffersAssets extends Component {

  async componentDidMount() {
    // For each offer in the smart contract retrieve the assets from OpenSea
    const newAssets = this.props.offers.map(offer => {
        // Check if it is already loaded
        if (!this.assetAlreadyLoaded(offer.smartContractAddressOfNFT, offer.tokenIdNFT)) {
          this.getAssetRequest(offer.smartContractAddressOfNFT, offer.tokenIdNFT).then(response => {
            this.props.addNewAsset(response.data);
          }).catch(error => {
            console.log(error)
          })
        }
      }
    )
  }

  render() {
    return(
      <div>
      </div>
    )
  }

  getAssetRequest = (contractAddress, tokenIdNFT) => {
    try {
      const response = axios.get("https://api.opensea.io/api/v1/asset/" + contractAddress + "/" + tokenIdNFT)
      return response;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  assetAlreadyLoaded = (contractAddress, tokenIdNFT) => {
    return (this.props.assetsForOffers.filter(offerAsset =>
      offerAsset.token_id == tokenIdNFT && offerAsset.asset_contract.address == contractAddress
    ).length > 0)
  }
}

const mapStateToProps = (state) => {
  return {
    offers: state.offers,
    assetsForOffers: state.assetsForOffers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewAsset: (newAsset) => { dispatch({'type': 'ADD_NEW_ASSETS', 'newAsset': newAsset}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetOffersAssets);
