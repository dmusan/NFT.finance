import React, { Component } from 'react'
import '../../../css/mystyles.css'
import SingleCard from "./SingleCard"
import { connect } from 'react-redux'

class MyAssetsCards extends Component {

  render() {
    const myNFTCards =  this.props.NFTAssets.length ? (
      this.props.NFTAssets.map(nft =>
        <SingleCard nft={nft} type={this.props.type} />
      )
    ) : (
      <h5 className="center">No NFTs in your wallet</h5>
    )
    return (
      <div className="row">
        {myNFTCards}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // TODO: Pass account address as props to other componenets
    userAddress: state.account.accountAddress,
    NFTAssets: state.account.accountAssets
  }
}

export default connect(mapStateToProps)(MyAssetsCards);
