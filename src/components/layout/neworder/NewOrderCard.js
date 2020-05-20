import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Web3 from 'web3'
import contractInterface from '../../../contractsInterfaces/LendNFT.json'

// TODO: replace
const CONTRACT_ADDRESS = '0x8693e34CDa0Dc04289399cad57822928EEc5CF6b'

async function getAccounts() {
  return window.ethereum.enable()
}

class NewOrderCard extends Component {

  // State will get some of the deatils from changes to input components
  state = {
      collateralAmount: '',
      priceToBorrow: '',
      loanPeriod: '',
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

  lendNFT = () => {
    console.log(this.state.collateralAmount)
    console.log(this.state.priceToBorrow)
    console.log(this.state.loanPeriod)
    console.log(this.props.nft.token_id)
    console.log(this.props.nft.asset_contract.address)
    console.log(this._account)
    console.log(this.props.userAddress)
    console.log(contractInterface)
    console.log(CONTRACT_ADDRESS)

    const crt = new this._web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: this._account})
    console.log(crt.options)
    crt.methods.createLendingOffer(
      this._account,
      this.props.nft.asset_contract.address,
      this.props.nft.token_id,
      this.state.collateralAmount,
      this.state.priceToBorrow,
      this.state.loanPeriod
    ).send().on('confirmation', () => {
      console.log("added to blockchain")
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
                        <input id="monthly_interest" type="text" class="validate" name="priceToBorrow" onChange={this.handleChange}/>
                        <label htmlFor="monthly_interest">Amount in ETH</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col s12">
                      Total Loan Period:
                      <div class="input-field inline">
                        <input id="loan_period_months" type="text" class="validate" name="loanPeriod" onChange={this.handleChange} />
                        <label htmlFor="loan_period_months">Days</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-action">
              <button className="button" onClick={this.lendNFT}>Place new order</button>
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
