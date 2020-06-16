import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from "materialize-css"
import SingleLoanRequest from './SingleLoanRequest'

// TODO: move consts
const LOADING_ASSET = {"image_url": "loadingImage", "name": "loadingAsset", "permalink": "https://opensea.io/assets", "description": "Loading Asset"};

class AllLoanRequests extends Component {

  filterBorrower = (loanRequest) => {
     if (this.props.requestsFilterBorrower === "") {
      return true;
    }
    // TODO change when updating smart contract
    return loanRequest.borrower === this.props.requestsFilterBorrower;
  }

  filterLender = (loanRequest) => {
    if (this.props.requestsFilterLender === "") {
      return true;
    }
    // TODO change when updating smart contract
    return loanRequest.lender === this.props.requestsFilterBorrower;
  }

  filterSelectedOptionStatus = (loanRequest) => {
    return loanRequest.status === this.props.selectedOptionStatus;
  }

  getNFTAsset = (loanRequest) => {
    const assets = this.props.allLoanAssets.filter(requestAsset => {
        try {
          return requestAsset.token_id === loanRequest.tokenIdNFT
            && requestAsset.asset_contract.address === loanRequest.smartContractAddressOfNFT
        } catch(error) {
          console.log("request asset is: " + JSON.stringify(requestAsset));
        }
      }
    );
    if (assets.length > 0) {
      return assets[0];
    }
    return LOADING_ASSET;
  }

  render() {
    const filteredLoanRequests =
                  this.props.allLoanRequests.filter(this.filterLender)
                                            .filter(this.filterBorrower)
                                            .filter(this.filterSelectedOptionStatus);

    const filteredLoanRequestsComponents = filteredLoanRequests.length ? (
      filteredLoanRequests.map( (loanRequest) =>
        <SingleLoanRequest loanRequest={loanRequest}
                           nftAsset={this.getNFTAsset(loanRequest)}
                           userAddress={this.props.userAddress}/>
      )
    ) : (
      <div className="center">No requests to show at the moment.</div>
    )
    return (
      <div className="container">
        {filteredLoanRequestsComponents}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allLoanRequests: state.loans.loanRequests,
    allLoanAssets: state.loans.loanAssets,
    userAddress: state.account.accountAddress.address
  }
}

export default connect(mapStateToProps)(AllLoanRequests)
