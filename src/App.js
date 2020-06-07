import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccountAddressAction, getAccountAssetAction } from './store/actions/accountActions'
import { getLeaseOffersAction, getLeaseAssetsAction } from './store/actions/leaseActions'
import { ToastMessage } from "rimble-ui";

import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/layout/home/HomePage'
import NewOrderPage from './components/layout/neworder/NewOrderPage'
import MyOrdersPage from './components/layout/myorders/MyOrdersPage'
import AllOrdersPage from './components/layout/allorders/AllOrdersPage'
import GetCardsFromWallet from './components/web3/opensea/GetCardsFromWallet'
import NewLeaseOffersPage from './components/layout/leasing/newlease/NewLeaseOfferPage'
import MyLeaseOffers from './components/layout/leasing/offers/MyLeaseOffers'

class App extends Component {

  componentDidMount() {
    this.props.getAccountAddressAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userAddress !== this.props.userAddress) {
      this.props.getAccountAssetAction(this.props.userAddress);
      this.props.getLeaseOffersAction(this.props.userAddress);
    }
    if (prevProps.leaseOffers.length !== this.props.leaseOffers.length) {
      this.props.getLeaseAssetsAction(this.props.leaseOffers);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        <Navbar />
        <Switch>
          <Route path='/neworder' component={NewOrderPage} />
          <Route path='/myorders' component={MyOrdersPage} />
          <Route path='/allorders' component={AllOrdersPage} />
          // New Pages
          <Route path='/newlease' component={NewLeaseOffersPage} />
          <Route path='/myleaseoffers' component={MyLeaseOffers} />
          <Route path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.account.accountAddress.address,
    leaseOffers: state.leasing.leaseOffers
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAccountAddressAction: () => dispatch(getAccountAddressAction()),
    getAccountAssetAction: (address) => dispatch(getAccountAssetAction(address)),
    getLeaseOffersAction: (address) => dispatch(getLeaseOffersAction(address)),
    getLeaseAssetsAction: (leaseOffers) => dispatch(getLeaseAssetsAction(leaseOffers))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
