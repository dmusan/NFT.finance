import React, { Component } from 'react'
import M from "materialize-css"
import { cancelOffer, approveNFT, endLendingOffer, borrowNFT } from '../../../../services/web3/leaseNFTContract'

// TODO: move consts
const OFFER_STATUS = ["Pending", "Active", "Cancelled", "Ended"];
const DEFAULT_BORROWER = "0x0000000000000000000000000000000000000000";

class SingleLeaseOffer extends Component {

  componentDidMount() {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }

  getOfferEndingTime = (endLendingTimeStamp) => {
    console.log("timestamp: " + endLendingTimeStamp);
    if (endLendingTimeStamp === "0") {
      return "Ending time not set";
    }
    else return Intl.DateTimeFormat('en-GB').format(this.props.leaseOffer.endLendingTimeStamp * 1000);
  }

  cancelOfferButton = (e) => {
    e.preventDefault();
    cancelOffer(this.props.leaseOffer.lendingID, this.props.userAddress);
  }

  requestCollateral = (e) => {
    e.preventDefault();
    endLendingOffer(this.props.leaseOffer.lendingID, this.props.userAddress);
  }

  approveReturn = (e) => {
    e.preventDefault();
    approveNFT(this.props.leaseOffer.smartContractAddressOfNFT,
              this.props.userAddress,
              this.props.leaseOffer.tokenIdNFT);
  }

  returnNFT = (e) => {
    e.preventDefault();
    endLendingOffer(this.props.leaseOffer.lendingID, this.props.userAddress);
  }

  acceptOffer = (e) => {
    e.preventDefault();
    borrowNFT(this.props.userAddress, this.props.leaseOffer.lendingID,
            this.props.leaseOffer.collateralAmount, this.props.leaseOffer.lendingPrice);
  }

  getAvailableButtons = () => {
    let buttons = [];

    if (this.props.leaseOffer.lender === this.props.userAddress) {
      if (OFFER_STATUS[this.props.leaseOffer.status] === "Pending") {
        // if offer is pending lender can cancel it
        buttons.push(
          <div class="card-action">
            <a href='/' onClick={this.cancelOfferButton}>Cancel</a>
          </div>
        );
      } else if (OFFER_STATUS[this.props.leaseOffer.status] === "Active" &&
                this.props.leaseOffer.endLendingTimeStamp <= Date.now()) {
          buttons.push(
            <div class="card-action">
              <a href='/' onClick={this.requestCollateral}>Cancel</a>
            </div>
          )
      }
    } else if (this.props.leaseOffer.borrower === this.props.userAddress &&
              OFFER_STATUS[this.props.leaseOffer.status] === "Active") {
      buttons.push(
        <div class="card-action">
          <a href='/' onClick={this.approveReturn}>1. Approve Return</a>
          <a href='/' onClick={this.returnNFT}>2. Return NFT</a>
        </div>
      )
    } else {
      if (OFFER_STATUS[this.props.leaseOffer.status] === "Pending" &&
         this.props.leaseOffer.borrower !== this.props.userAddress) {
        buttons.push(
          <div class="card-action">
            <a href='/' onClick={this.acceptOffer}>Accept Offer</a>
          </div>
        )
      }
    }
    return buttons;
  }

  render() {
    const actions = this.getAvailableButtons();
    return(
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">{this.props.nftAsset.name}</div>
          <div class="collapsible-body">
            <div class="card transparent z-depth-0 center-align">
              <div class="card-content black-text">
                <span class="card-title">{this.props.nftAsset.name}</span>
                <div className="row">
                  <img src={this.props.nftAsset.image_url} />
                </div>
                <div className="row">
                  {this.props.nftAsset.description}
                </div>
                <div className="row">
                  More info on <a href={this.props.nftAsset.permalink}>OpenSea</a>
                </div>
                <br/>
                <div className="row">
                  <p>Lender: {this.props.leaseOffer.lender}</p>
                </div>
                <div className="row">
                  <p>Borrower: {this.props.leaseOffer.borrower}</p>
                </div>
                <div className="row">
                  <p>Collateral Amount: {this.props.leaseOffer.collateralAmount / Math.pow(10, 18)}</p>
                </div>
                <div className="row">
                  <p>Lending Price: {this.props.leaseOffer.lendingPrice / Math.pow(10, 18)}</p>
                </div>
                <div className="row">
                  <p>Lending Period (hours): {this.props.leaseOffer.lendinPeriod / 3600}</p>
                </div>
                <div className="row">
                  <p>End Lending Time: {this.getOfferEndingTime(this.props.leaseOffer.endLendingTimeStamp)}</p>
                </div>
                <div className="row">
                  <p>Lending Status: {OFFER_STATUS[this.props.leaseOffer.status]}</p>
                </div>
                {actions}
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

export default SingleLeaseOffer;
