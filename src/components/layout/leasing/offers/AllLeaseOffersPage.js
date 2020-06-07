import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllLeaseOffers from './AllLeaseOffers'
import '../../../../css/mystyles.css'

// TODO move consts and styles
const NO_BORROWER = "0x0000000000000000000000000000000000000000";

// ADD My Lease Offers "Page" to name
class AllLeaseOffersPage extends Component {

  state = {
    selectedOption: "0"
  }

  handleOptionChange = (evt) => {
    this.setState({ selectedOption: evt.target.name });
  }

  render() {
    return (
      <div className="container">
        <h5 className="grey-text text-darken-3 any-page-title-margin">All Lease Offers</h5>
        <div className="wrapper">
        <div className='row'>
          <div className='col s2 m2'>
            <form action="#">
              <p>
                <label>
                  <input className="with-gap" name="0" type="radio"
                         checked={this.state.selectedOption === "0" }
                         onChange={this.handleOptionChange} />
                  <span>Pending</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="1" type="radio"
                         checked={this.state.selectedOption === "1" }
                         onChange={this.handleOptionChange} />
                  <span>Active</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="2" type="radio"
                         checked={this.state.selectedOption === "2" }
                         onChange={this.handleOptionChange} />
                  <span>Cancelled</span>
                </label>
              </p>
              <p>
                <label>
                  <input className="with-gap" name="3" type="radio"
                         checked={this.state.selectedOption === "3" }
                         onChange={this.handleOptionChange} />
                       <span>Ended</span>
                </label>
              </p>
            </form>
          </div>
          <div className='col s10 m10'>
            <AllLeaseOffers
              offersFilterLender=""
              offersFilterBorrower=""
              selectedOptionStatus={this.state.selectedOption} />
          </div>
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.account.accountAddress.address
  }
}

export default connect(mapStateToProps)(AllLeaseOffersPage);
