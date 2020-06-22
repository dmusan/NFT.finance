import React from 'react'
import MyAssetsCards from '../../cards/MyAssetsCards'

const NewLeaseOfferPage = () => {
  return (
    <div className="container">
      <h4 className="indigo-text text-darken-2 page-title-margin">Create New Lease</h4>
      <p className="grey-text text-darken-2 page-subtitle-margin">Leasing enables other users to use your NFT for a limited period of time</p>
      <MyAssetsCards type="lease" />
    </div>
  )
}

export default NewLeaseOfferPage;
