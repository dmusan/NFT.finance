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
          owner: '0xdab358a421f4f911cda7f1514f89e22db0e438cf',
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
