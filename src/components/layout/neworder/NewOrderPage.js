import React from 'react'
import NewOrderCard from './NewOrderCard'
import MyCards from '../cards/MyCards'
import GetCardsFromWallet from '../../web3/opensea/GetCardsFromWallet'
import '../../../css/mystyles.css'

// TODO: delete
const NewOrderPage = () => {
  return (
    <div className="container">
      <h4>Pick an NFT from your wallet to lend</h4>
      <div className="wrapper">
        <MyCards />
      </div>
      <GetCardsFromWallet />
    </div>
  )
}

export default NewOrderPage;
