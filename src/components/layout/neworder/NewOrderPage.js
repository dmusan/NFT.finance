import React from 'react'
import NewOrderCard from './NewOrderCard'
import MyCards from '../cards/MyCards'
import '../../../css/mystyles.css'

const NewOrderPage = () => {
  return (
    <div className="container">
      <h3>Pick an NFT from your wallet</h3>
      <div className="wrapper">
        <MyCards />
      </div>
      <div className="valign-wrapper vertical-wrapper">
        <NewOrderCard />
      </div>
    </div>
  )
}

export default NewOrderPage;
