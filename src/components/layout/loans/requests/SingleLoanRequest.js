import React, { Component } from 'react'
import M from "materialize-css"
import { cancelLoanRequest, endLoanRequest, acceptLoanRequest, extendLoanRequest } from '../../../../services/web3/loansNFTContract'
import { REQUEST_STATUS } from '../../../../assets/consts/requestsConsts'
import { EthAddress } from "rimble-ui";


class SingleLoanRequest extends Component {

  componentDidMount() {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }

  getRequestEndingTime = (endLoanTimeStamp) => {
    if (endLoanTimeStamp === "0") {
      return "Ending time not set";
    }
    else return Intl.DateTimeFormat('en-GB').format(this.props.loanRequest.endLoanTimeStamp * 1000);
  }

  cancelRequestButton = (e) => {
    e.preventDefault();
    cancelLoanRequest(this.props.userAddress, this.props.loanRequest.loanID);
  }

  requestNFTCollateral = (e) => {
    e.preventDefault();
    endLoanRequest(this.props.userAddress, this.props.loanRequest.loanID);
  }

  endLoanRequest = (e) => {
    e.preventDefault();
    endLoanRequest(this.props.userAddress,
                   this.props.loanRequest.loanID,
                   this.props.loanRequest.loanAmount);
  }

  acceptLoanRequest = (e) => {
    e.preventDefault();
    acceptLoanRequest(
      this.props.userAddress,
      this.props.loanRequest.loanID,
      this.props.loanRequest.loanAmount,
      this.props.loanRequest.interestAmount
    );
  }

  extendLoanRequest = (e) => {
    e.preventDefault();
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
        // if request is pending lender can cancel it
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
                  <a className="btn waves-effect waves-light indigo lighten-1 button-offer" href={this.props.nftAsset.permalink}>OpenSea</a>
                </div>
                <br/>
                <div className="row left-align">
                  <b>Lender </b>
                  <EthAddress address={this.props.loanRequest.lender} />
                </div>
                <div className="row left-align">
                  <b>Borrower </b>
                  <EthAddress address={this.props.loanRequest.borrower} />
                </div>
                <div className="row left-align">
                  <p><b>Principal Amount: </b> {this.props.loanRequest.loanAmount / Math.pow(10, 18)}</p>
                </div>
                <div className="row left-align">
                  <p><b>Interest Amount: </b> {this.props.loanRequest.interestAmount / Math.pow(10, 18)}</p>
                </div>
                <div className="row left-align">
                  <p><b>Single period (days): </b>{this.props.loanRequest.singlePeriodTime / 86400}</p>
                </div>
                <div className="row left-align">
                  <p><b>Maximum Interest periods left: </b>{this.props.loanRequest.maximumInterestPeriods}</p>
                </div>
                <div className="row left-align">
                  <p><b>Loan End Date: </b>{this.getRequestEndingTime(this.props.loanRequest.endLoanTimeStamp)}</p>
                </div>
                <div className="row left-align">
                  <p><b>Lending Status: </b>{REQUEST_STATUS[this.props.loanRequest.status]}</p>
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
