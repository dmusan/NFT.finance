import React, { Component } from 'react'
import axios from 'axios';

class GetCardsFromWallet extends Component {

  constructor() {
    super();
    this.getNFTsRequest = this.getNFTsRequest.bind(this);
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
      console.log(JSON.stringify(response))
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
      <div>
       test
      </div>
    )
  }
}

export default GetCardsFromWallet;
