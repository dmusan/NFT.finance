import React, { Component } from 'react'
import Web3 from 'web3'
import contractInterface from '../../contractsInterfaces/LendNFT.json'

const CONTRACT_ADDRESS = '0x2efe27fe87eeDFC26d4a931d4b7A74E641E061f3'

async function getAccounts() {
  return window.ethereum.enable()
}

async function getAllLendingOffers(web3, account) {
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, { from: account });
  const lendingOffersNumberPromise = parseInt(await crt.methods.getNumberOfLendingOffers().call());
  return lendingOffersNumberPromise;
}


class GetLendingOffers extends Component {
  state ={
    totalOffers: 0,
  };

  componentDidMount() {
    this._getAccounts = getAccounts().then(
      accounts => {
        this._getAccounts = null;
        this._web3 = new Web3(window.ethereum);
        this._account = accounts[0];
        getAllLendingOffers(this._web3, this._account).then(
          n => this.setState({totalOffers: n})
        );
      }
    );
  }

  componentWillUnmount() {
    if (this._getAccounts) {
      this._getAccounts.cancel();
    }

    // if (this._getCards) {
    //   this._getCards.cancel();
    // }
  }
  //
  // refreshLendingOffers() {
  //   this._getCards = getCards(this._web3, this._account).then(
  //     _cards => {
  //       this._getCards = null
  //       this.setState({cards: _cards})
  //     }
  //   )
  // }

  render() {
    const off = this.state.totalOffers;
    return (
        <div>State
          { off }
        </div>
    );
  }
}

export default GetLendingOffers;
