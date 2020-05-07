import React from 'react'
import { NavLink } from 'react-router-dom'

const NewOrderCard = () => {
  return (
    <div class="row card-width">
      <div class="col s12 m12 card-width">
        <div class="card blue-grey center-align">
          <div class="card-content white-text">
            <span class="card-title">New Order</span>
            <br/>
            <p>
              Specify the details of your loan
            </p>
            <br/>
          </div>
          <div class="row white-text">
            <form class="col s12 m12">
              <div class="row">
                <div class="row">
                  <div class="col s12">
                    Choose your collateral:
                    <div class="input-field inline">
                      <input id="collateral_id" type="text" class="validate" />
                      <label for="collateral_id">Collateral</label>
                      <span class="helper-text" data-error="wrong" data-success="right">You can choose collateral from your wallet</span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    Loan Amount:
                    <div class="input-field inline">
                      <input id="loan_amount" type="text" class="validate" />
                      <label for="loan_amount">Amount</label>
                      <span class="helper-text" data-error="wrong" data-success="right">How much you would like to receive as loan</span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    Monthly interest:
                    <div class="input-field inline">
                      <input id="monthly_interest" type="text" class="validate" />
                      <label for="monthly_interest">Percentage</label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    Total Loan Period:
                    <div class="input-field inline">
                      <input id="loan_period_months" type="text" class="validate" />
                      <label for="loan_period_months">Months</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="card-action">
            <NavLink to='/neworder'>Place new order</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewOrderCard;
