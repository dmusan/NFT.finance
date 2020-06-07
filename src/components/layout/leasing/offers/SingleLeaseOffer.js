import React, { Component } from 'react'
import M from "materialize-css"
import { cancelOffer } from '../../../../services/web3/leaseNFTContract'

// TODO: move consts
const OFFER_STATUS = ["Pending", "Active", "Cancelled", "Ended"];
const DEFAULT_BORROWER = "0x0000000000000000000000000000000000000000";

class SingleLeaseOffer extends Component {

  componentDidMount() {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }

  cancelOfferButton = (e) => {
    e.preventDefault();
    cancelOffer(this.props.leaseOffer.lendingID, this.props.userAddress);
  }

  buttonAction = (e) => {
    e.preventDefault();
  }

  getAvailableActions() {
    let actions = [];
    if (this.props.leaseOffer.lender === this.props.userAddress) {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.cancelOfferButton}>Cancel</a>
        </div>
      );
      if (this.props.leaseOffer.borrower != DEFAULT_BORROWER) {
        actions.push(
          <div class="card-action">
            <a href='/' onClick={this.buttonAction}>Request Collateral</a>
          </div>
        );
      }
    } else if (this.props.leaseOffer.borrower === this.props.userAddress) {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.buttonAction}>Approve Return</a>
          <a href='/' onClick={this.buttonAction}>Return NFT</a>
        </div>
      );
    } else {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.buttonAction}>Borrow</a>
        </div>
      );
    }
    return actions;
  }


  render() {
    const actions = this.getAvailableActions();
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
