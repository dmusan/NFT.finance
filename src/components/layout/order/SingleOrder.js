import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from "materialize-css";
import Web3 from 'web3'
import contractInterface from '../../../contractsInterfaces/LendNFT.json'
import erc721ContractInterface from '../../../contractsInterfaces/erc721.json'


const CONTRACT_ADDRESS = '0x8693e34CDa0Dc04289399cad57822928EEc5CF6b'
const OFFER_STATUS = ["Pending", "Active", "Cancelled", "Ended"]

async function getAccounts() {
  return window.ethereum.enable()
}

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

    this._getAccounts = getAccounts().then(
      accounts => {
        this._getAccounts = null;
        this._web3 = new Web3(window.ethereum);
        this._account = accounts[0];
      }
    );
  }

  getOfferAsset(contractAddress, tokenIdNFT) {
    // maybe change to state
    const loadingAsset = {"image_url": "loadingImage", "name": "loadingAsset", "permalink": "https://opensea.io/assets", "description": "Loading Asset"};

    const assets = this.props.assetsForOffers.filter(offerAsset => {
      return offerAsset.token_id === tokenIdNFT && offerAsset.asset_contract.address === contractAddress;
    });


    if (assets.length > 0) {
      return assets[0];
    } else return loadingAsset;
  }

  getAvailableActions() {
    let actions = [];
    if (this.props.offer.lender === this.props.userAddress.address) {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.cancelOffer}>Cancel</a>
        </div>
      );
      if (this.props.offer.borrower != "0x0000000000000000000000000000000000000000") {
        actions.push(
          <div class="card-action">
            <a href='/' onClick={this.endLendingOffer}>Request Collateral</a>
          </div>
        );
      }
    } else if (this.props.offer.borrower === this.props.userAddress.address) {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.approveReturn}>Approve Return</a>
          <a href='/' onClick={this.endLendingOffer}>Return NFT</a>
        </div>
      );
    } else {
      actions.push(
        <div class="card-action">
          <a href='/' onClick={this.borrowNFT}>Borrow</a>
        </div>
      );
    }
    return actions;
  }

  cancelOffer = (e) => {
    e.preventDefault();
    const crt = new this._web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: this._account});
    crt.methods.cancelLendingOffer(this.props.offer.lendingID).send().on('confirmation', () => {
      console.log("cancelled offer")
    })
  }

  endLendingOffer = (e) => {
    e.preventDefault();
    const crt = new this._web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: this._account});
    crt.methods.endLendingOffer(this.props.offer.lendingID).send().on('confirmation', () => {
      console.log("cancelled offer")
    })
  }

  approveReturn = (e) => {
    e.preventDefault();
    const erc721crt = new this._web3.eth.Contract(erc721ContractInterface, this.props.offer.smartContractAddressOfNFT, {from: this._account});
    erc721crt.methods.approve(CONTRACT_ADDRESS, this.props.offer.tokenIdNFT).send().on('confirmation', () => {
      console.log("approvedNFT")
    })
  }

  borrowNFT = (e) => {
    e.preventDefault();
    const crt = new this._web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: this._account});
    // add big number OPs
    const colAm = parseFloat(this._web3.utils.fromWei(this.props.offer.collateralAmount, 'ether'));
    const lenPr = parseFloat(this._web3.utils.fromWei(this.props.offer.lendingPrice, 'ether'));
    const sumString = (colAm + lenPr).toString();
    const amountToBorrowETH = this._web3.utils.toWei(sumString);
    crt.methods.acceptLendingOffer(this.props.offer.lendingID).send({value: amountToBorrowETH}).on('confirmation', () => {
      console.log("borred offer")
    })
  }

  render() {
    const actions = this.getAvailableActions();
    const offerAsset = this.getOfferAsset(this.props.offer.smartContractAddressOfNFT, this.props.offer.tokenIdNFT);
    return (
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">{offerAsset.name}</div>
          <div class="collapsible-body">
            <div class="card transparent z-depth-0 center-align">
              <div class="card-content black-text">
                <span class="card-title">{offerAsset.name}</span>
                <div className="row">
                  <img src={offerAsset.image_url} />
                </div>
                <div className="row">
                  {offerAsset.description}
                </div>
                <div className="row">
                  More info on <a href={offerAsset.permalink}>OpenSea</a>
                </div>
                <br/>
                <div className="row">
                  <p>Lender: {this.props.offer.lender}</p>
                </div>
                <div className="row">
                  <p>Borrower: {this.props.offer.borrower}</p>
                </div>
                <div className="row">
                  <p>Collateral Amount: {this.props.offer.collateralAmount / Math.pow(10, 18)}</p>
                </div>
                <div className="row">
                  <p>Lending Price: {this.props.offer.lendingPrice / Math.pow(10, 18)}</p>
                </div>
                <div className="row">
                  <p>Lending Period (hours): {this.props.offer.lendinPeriod / 3600}</p>
                </div>
                <div className="row">
                  <p>Lending Status: {OFFER_STATUS[this.props.offer.status]}</p>
                </div>
              </div>
              {actions}
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    assetsForOffers: state.assetsForOffers,
    userAddress: state.userAddress,
  }
}

export default connect(mapStateToProps) (SingleOrder);
