import React, { Component } from 'react'
import { connect } from 'react-redux'
import Web3 from 'web3'
import contractInterface from '../../contractsInterfaces/LendNFT.json'

const CONTRACT_ADDRESS = '0x2efe27fe87eeDFC26d4a931d4b7A74E641E061f3'

async function getAccounts() {
  return window.ethereum.enable()
}

async function getAllLendingOffers(web3, account) {
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, { from: account });
  const lendingOffersNumberPromise = parseInt(await crt.methods.totalLendingOffers().call())
  return Promise.all([...Array(lendingOffersNumberPromise + 1).keys()].map(
    id => crt.methods.allLendingOffers(id).call()
  ))
}


class GetLendingOffers extends Component {
  state = {
    lendingOffers: [],
  };

  componentDidMount() {
    this._getAccounts = getAccounts().then(
      accounts => {
        this._getAccounts = null;
        this._web3 = new Web3(window.ethereum);
        this._account = accounts[0];
        this.refreshLendingOffers();
      }
    );
  }

  componentWillUnmount() {
    if (this._getAccounts) {
      this._getAccounts.cancel();
    }

    if (this._getAllLendingOffers) {
      this._getAllLendingOffers.cancel();
    }
  }

  refreshLendingOffers() {
    this._getAllLendingOffers = getAllLendingOffers(this._web3, this._account).then(
      _lendingOffers => {
        this._getAllLendingOffers = null
        this.setState({ lendingOffers: _lendingOffers })
        this.props.addAllOffers(this.state.lendingOffers)
      }
    )
  }

  render() {
    const lendingOffersView = this.state.lendingOffers.map(offer =>
      <div>
        {offer.lendingID}
      </div>
    )

    return (
        <div>State
          { lendingOffersView }
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAllOffers: (allOffers) => { dispatch({'type': 'ADD_ALL_OFFERS', 'allOffers': allOffers}) }
  }
}

export default connect(null, mapDispatchToProps)(GetLendingOffers);
