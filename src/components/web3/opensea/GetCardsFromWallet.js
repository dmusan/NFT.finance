import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

class GetCardsFromWallet extends Component {

  constructor() {
    super();
  }

  getNFTsRequest() {
    try {
      const response = axios.get('https://api.opensea.io/api/v1/assets/', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: {
          order_direction: 'desc',
          offset: '0',
          owner: '0xd20c29f34ee11ef39b0F14c3dfBc86833dd1d04B',
        }
      })
      return response;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  async componentDidMount() {
    const NFTs = this.getNFTsRequest().then(response => {
      this.props.addMyNFTs(response.data.assets)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
      <div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMyNFTs: (nftsList) => { dispatch({'type': 'ADD_MY_NFTS', 'nftsList': nftsList}) }
  }
}

export default connect(null, mapDispatchToProps)(GetCardsFromWallet);
