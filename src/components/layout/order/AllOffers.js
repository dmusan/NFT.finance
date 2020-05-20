import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../../css/mystyles.css'
import SingleOrder from "./SingleOrder"
import GetOffersAssets from '../../web3/opensea/GetOffersAssets'

class AllOffers extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const filteredOfferes = this.props.offers.filter(this.filterLender).filter(this.filterBorrower);
    const offersList =  filteredOfferes.length ? (
      filteredOfferes.map(offer =>
        <SingleOrder offer={offer} />
      )
    ) : (
      <div class="center">No offers to show at the moment.</div>
    )
    return (
      <div className="row">
        <GetOffersAssets />
        {offersList}
      </div>
    )
  }

  filterLender = (nft) => {
    if (this.props.offersFilterLender === "") {
      return true;
    }
    return nft.lender == this.props.offersFilterLender;
  }

  filterBorrower = (nft) => {
     if (this.props.offersFilterBorrower === "") {
      return true;
    }
    return nft.borrower == this.props.offersFilterBorrower;
  }
}

const mapStateToProps = (state) => {
  return {
    offers: state.offers
  }
}

export default connect(mapStateToProps)(AllOffers);
