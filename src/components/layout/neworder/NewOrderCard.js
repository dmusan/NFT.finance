import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NewOrderCard extends Component {

  state = {
      prevOwnerAddress: 'aaa',
      collateralAmount: '',
      priceToBorrow: '',
      loanPeriod: '',
      smartContractAddressOfNFT: '',
      tokenIdNFT: '',
  }

  constructor(props) {
    super(props);
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  lendNFT = () => {
    console.log(this.state)
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

export default NewOrderCard;
