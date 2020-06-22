import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllLeaseOffers from './AllLeaseOffers'


class MyLeaseOffers extends Component {

  state = {
    selectedOption: "0",
    selectedRole: "lessor"
  }

  handleOptionChange = (evt) => {
    this.setState({ selectedOption: evt.target.name });
  }

  handleRoleChange = (evt) => {
    this.setState({ selectedRole: evt.target.name });
  }

  render() {
    let allLeaseOffers;
    if (this.state.selectedRole === "lessor") {
      allLeaseOffers = <AllLeaseOffers
              offersFilterLender={this.props.userAddress}
              offersFilterBorrower=""
              selectedOptionStatus={this.state.selectedOption} />
    } else {
      allLeaseOffers = <AllLeaseOffers
              offersFilterLender=""
              offersFilterBorrower={this.props.userAddress}
              selectedOptionStatus={this.state.selectedOption} />
    }

    return (
      <div className="container">
        <h5 className="grey-text text-darken-3 any-page-title-margin">My Lease Offers</h5>
        <div className="wrapper">
        <div className='row'>
          <div className='col s2 m2'>
            <div className='row'>
              <p>Filter your Role</p>
                <form action="#">
                  <p>
                    <label>
                      <input className="with-gap" name="lessor" type="radio"
                             checked={this.state.selectedRole === "lessor" }
                             onChange={this.handleRoleChange} />
                           <span>Lessor</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input className="with-gap" name="lessee" type="radio"
                             checked={this.state.selectedRole === "lessee" }
                             onChange={this.handleRoleChange} />
                           <span>Lessee</span>
                    </label>
                  </p>
                </form>
            </div>
            <div className='row'>
              <p>Filter Offer Status</p>
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
          </div>
          <div className='col s10 m10'>
            {allLeaseOffers}
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

export default connect(mapStateToProps)(MyLeaseOffers);
