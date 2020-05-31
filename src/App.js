import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccountAddressAction, getAccountAssetAction } from './store/actions/accountActions'
import { getLeaseOffersAction } from './store/actions/leaseActions'

import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/layout/home/HomePage'
import NewOrderPage from './components/layout/neworder/NewOrderPage'
import MyOrdersPage from './components/layout/myorders/MyOrdersPage'
import AllOrdersPage from './components/layout/allorders/AllOrdersPage'
import GetCardsFromWallet from './components/web3/opensea/GetCardsFromWallet'

class App extends Component {

  componentDidMount() {
    this.props.getAccountAddressAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userAddress !== this.props.userAddress) {
      this.props.getAccountAssetAction(this.props.userAddress);
      this.props.getLeaseOffersAction(this.props.userAddress);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/neworder' component={NewOrderPage} />
          <Route path='/myorders' component={MyOrdersPage} />
          <Route path='/allorders' component={AllOrdersPage} />
          <Route path='/' component={HomePage} />
        </Switch>
        <GetCardsFromWallet />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.account.accountAddress.address,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAccountAddressAction: () => dispatch(getAccountAddressAction()),
    getAccountAssetAction: (address) => dispatch(getAccountAssetAction(address)),
    //TODO remove
    getLeaseOffersAction: (address) => dispatch(getLeaseOffersAction(address))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
