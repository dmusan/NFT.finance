import React from 'react'
import MyAssetsCards from '../../cards/MyAssetsCards'

const NewLoanRequestPage = () => {
  return (
    <div className="container">
      <h4 className="indigo-text text-darken-2 page-title-margin">
      Create New Loan Request
      </h4>
      <p className="grey-text text-darken-2 page-subtitle-margin">A Loan Request enables you to get access to liquidity by locking your NFT as collateral</p>
      <MyAssetsCards type="loan"/>
    </div>
  )
}

export default NewLoanRequestPage;
