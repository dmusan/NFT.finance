import React, { Component } from 'react'
import M from "materialize-css"
import { cancelLoanRequest, endLoanRequest, acceptLoanRequest, extendLoanRequest } from '../../../../services/web3/loansNFTContract'

// TODO: move consts
const REQUEST_STATUS = ["Pending", "Active", "Cancelled", "Ended", "Defaulted"];

class SingleLoanRequest extends Component {

  componentDidMount() {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }

  getRequestEndingTime = (endLoanTimeStamp) => {
    if (endLoanTimeStamp === "0") {
      return "Ending time not set";
    }
    // TODO add const
    else return Intl.DateTimeFormat('en-GB').format(this.props.loanRequest.endLoanTimeStamp * 1000);
  }

  cancelRequestButton = (e) => {
    e.preventDefault();
    console.log("user address: " + this.props.userAddress);
    console.log("loan id: " + this.props.loanRequest.loanID);
    cancelLoanRequest(this.props.userAddress, this.props.loanRequest.loanID);
  }

  requestNFTCollateral = (e) => {
    e.preventDefault();
    console.log("user address: " + this.props.userAddress);
    console.log("loan id: " + this.props.loanRequest.loanID);
    endLoanRequest(this.props.userAddress, this.props.loanRequest.loanID);
  }

  endLoanRequest = (e) => {
    e.preventDefault();
    console.log("user address: " + this.props.userAddress);
    console.log("loan id: " + this.props.loanRequest.loanID);
    endLoanRequest(this.props.userAddress,
                   this.props.loanRequest.loanID,
                   this.props.loanRequest.loanAmount);
  }

  acceptLoanRequest = (e) => {
    e.preventDefault();
    console.log("user address: " + this.props.userAddress);
    console.log("loan id: " + this.props.loanRequest.loanID);
    console.log("loan amount: " + this.props.loanRequest.loanAmount);
    console.log("interest amount: " + this.props.loanRequest.interestAmount);
    acceptLoanRequest(
      this.props.userAddress,
      this.props.loanRequest.loanID,
      this.props.loanRequest.loanAmount,
      this.props.loanRequest.interestAmount
    );
  }

  extendLoanRequest = (e) => {
    e.preventDefault();
    console.log("user address: " + this.props.userAddress);
    console.log("loan id: " + this.props.loanRequest.loanID);
    console.log("interest amount: " + this.props.loanRequest.interestAmount);
    extendLoanRequest(
      this.props.userAddress,
      this.props.loanRequest.loanID,
      this.props.loanRequest.interestAmount
    )
  }

  getAvailableButtons = () => {
    let buttons = [];

    if (this.props.loanRequest.borrower === this.props.userAddress) {
      if (REQUEST_STATUS[this.props.loanRequest.status] === "Pending") {
        // if offer is pending lender can cancel it
        buttons.push(
          <div class="card-action">
            <a href='/' onClick={this.cancelRequestButton}>Cancel</a>
          </div>
        );
      } else if (REQUEST_STATUS[this.props.loanRequest.status] === "Active") {
        if (this.props.loanRequest.maximumInterestPeriods > 0) {
          buttons.push(
            <div class="card-action">
              <a href='/' onClick={this.extendLoanRequest}>Extend Loan</a>
            </div>
          )
        }
        buttons.push(
          <div class="card-action">
            <a href='/' onClick={this.endLoanRequest}>End Loan and return principal</a>
          </div>
        )
      }
    } else if (this.props.loanRequest.lender === this.props.userAddress &&
               REQUEST_STATUS[this.props.loanRequest.status] === "Active" &&
               this.props.loanRequest.endLoanTimeStamp * 1000 <= Date.now()) {
      buttons.push(
        <div class="card-action">
          <a href='/' onClick={this.endLoanRequest}>Request NFT Collateral</a>
        </div>
      )
    } else if (REQUEST_STATUS[this.props.loanRequest.status] === "Pending") {
      buttons.push(
        <div class="card-action">
          <a href='/' onClick={this.acceptLoanRequest}>Accept Loan</a>
        </div>
      )
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
                  <p>Lender: {this.props.loanRequest.lender}</p>
                </div>
                <div className="row">
                  <p>Borrower: {this.props.loanRequest.borrower}</p>
                </div>
                <div className="row">
                  <p>Principal Amount: {this.props.loanRequest.loanAmount / Math.pow(10, 18)}</p>
                </div>
                <div className="row">
                  <p>Interest Amount: {this.props.loanRequest.interestAmount / Math.pow(10, 18)}</p>
                </div>
                <div className="row">
                  <p>Single period (days): {this.props.loanRequest.singlePeriodTime / 86400}</p>
                </div>
                <div className="row">
                  <p>Maximum Interest periods left: {this.props.loanRequest.maximumInterestPeriods}</p>
                </div>
                <div className="row">
                  <p>Loan End Date: {this.getRequestEndingTime(this.props.loanRequest.endLoanTimeStamp)}</p>
                </div>
                <div className="row">
                  <p>Lending Status: {REQUEST_STATUS[this.props.loanRequest.status]}</p>
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

export default SingleLoanRequest;
