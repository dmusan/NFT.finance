import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

class GetCardsFromWallet extends Component {

  constructor() {
    super();
  }

  // getNFTsRequest() {
  //   try {
  //     const response = axios.get('https://rinkeby-api.opensea.io/api/v1/assets/', {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       params: {
  //         order_direction: 'desc',
  //         offset: '0',
  //         owner: this.props.userAddress.address,
  //       }
  //     });
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //     return 0;
  //   }
  // }

  render() {
    // const NFTs = this.getNFTsRequest().then(response => {
    //   this.props.addMyNFTs(response.data.assets)
    // })
    // .catch(error => {
    //   console.log(error)
    // });
    return(
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.userAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMyNFTs: (nftsList) => { dispatch({'type': 'ADD_MY_NFTS', 'nftsList': nftsList}) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetCardsFromWallet);
