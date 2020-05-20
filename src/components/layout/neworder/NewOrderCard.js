import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Web3 from 'web3'
import contractInterface from '../../../contractsInterfaces/LendNFT.json'
import erc721ContractInterface from '../../../contractsInterfaces/erc721.json'

// TODO: replace
const CONTRACT_ADDRESS = '0x8693e34CDa0Dc04289399cad57822928EEc5CF6b'

async function getAccounts() {
  return window.ethereum.enable()
}

class NewOrderCard extends Component {

  // State will get some of the deatils from changes to input components
  state = {
      collateralAmount: '',
      lendingPrice: '',
      lendinPeriod: '',
  }

  // In props we will receive the userAddress from the reducer
  // The NFT details (smartContractAddressOfNFT, tokenIdNFT) from SingleMyCard
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._getAccounts = getAccounts().then(
      accounts => {
        this._getAccounts = null;
        this._web3 = new Web3(window.ethereum);
        this._account = accounts[0];
      }
    );
  }

  lendNFT = (e) => {
    e.preventDefault();
    const ethCollateralAmount = this._web3.utils.toWei(this.state.collateralAmount);
    const ethLendingPrice = this._web3.utils.toWei(this.state.lendingPrice);
    const crt = new this._web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: this._account});
    crt.methods.createLendingOffer(
      this.props.nft.asset_contract.address,
      this.props.nft.token_id,
      ethCollateralAmount,
      ethLendingPrice,
      this.state.lendinPeriod * 3600
    ).send().on('confirmation', () => {
      console.log("added to blockchain")
    })
  }

  approveNFT = (e) => {
    e.preventDefault();
    const erc721crt = new this._web3.eth.Contract(erc721ContractInterface, this.props.nft.asset_contract.address, {from: this._account});
    erc721crt.methods.approve(CONTRACT_ADDRESS, this.props.nft.token_id).send().on('confirmation', () => {
      console.log("approvedNFT")
    })
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div class="row">
        <div class="col s12 m12 card-width">
          <div class="card blue-grey center-align">
            <div class="card-content white-text">
              <h6>
                Specify the details for lending your NFT
              </h6>
              <br/>
            </div>
            <div class="row white-text">
              <form class="col s12 m12">
                <div class="row">
                  <div class="col s12">
                    Collateral Amount:
                    <div class="input-field inline">
                      <input id="loan_amount" type="text" class="validate" name="collateralAmount" onChange={this.handleChange} />
                      <label htmlFor="loan_amount">Amount in ETH</label>
                      <div class="helper-text" data-error="wrong" data-success="right">Check docs for more info</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12">
                      Price to borrow:
                      <div class="input-field inline">
                        <input id="monthly_interest" type="text" class="validate" name="lendingPrice" onChange={this.handleChange}/>
                        <label htmlFor="monthly_interest">Amount in ETH</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12">
                      Total Loan Period:
                      <div class="input-field inline">
                        <input id="loan_period_months" type="text" class="validate" name="lendinPeriod" onChange={this.handleChange} />
                        <label htmlFor="loan_period_months">Hours</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12">
                      You must first approve the transfer of the NFT:
                      <button onClick={this.approveNFT}>Approve transfer</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-action">
              <button onClick={this.lendNFT}>Place new order</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.userAddress
  }
}

export default connect(mapStateToProps)(NewOrderCard);
