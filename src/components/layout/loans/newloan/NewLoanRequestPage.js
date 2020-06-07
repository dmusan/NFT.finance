import React from 'react'
import MyAssetsCards from '../../cards/MyAssetsCards'

const NewLoanRequestPage = () => {
  return (
    <div className="container">
      <h5 className="grey-text text-darken-3 page-title-margin">
      Pick an NFT from your wallet as collateral for the loan
      </h5>
      <MyAssetsCards type="loan"/>
    </div>
  )
}

export default NewLoanRequestPage;
