import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllLeaseOffers from './AllLeaseOffers'

class MyLeaseOffers extends Component {

  render() {
    return (
      <div>
        <AllLeaseOffers
          offersFilterLender={this.props.userAddress}
          offersFilterBorrower={"0x0000000000000000000000000000000000000000"}/>
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
