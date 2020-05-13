import React, { Component } from 'react'
import '../../../css/mystyles.css'
import SingleMyCard from "./SingleMyCard"
import { connect } from 'react-redux'

class MyCards extends Component {
  render() {
    // console.log(this.props.nfts);
    const myNFTCards =  this.props.nfts.length ? (
      this.props.nfts.map(nft =>
        <SingleMyCard nft={nft} />
      )
    ) : (
      <div class="center">No NFTs in your wallet</div>
    )
    console.log(myNFTCards);
    return (
      <div className="row">
        {myNFTCards}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nfts: state.nfts
  }
}

export default connect(mapStateToProps)(MyCards);
