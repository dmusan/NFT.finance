import React from 'react'
import MyAssetsCards from '../../cards/MyAssetsCards'

const NewLeaseOfferPage = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <h5 className="grey-text text-darken-3 page-title-margin">Pick an NFT from your wallet to lease out</h5>
        <MyAssetsCards />
      </div>
    </div>
  )
}

export default NewLeaseOfferPage;
