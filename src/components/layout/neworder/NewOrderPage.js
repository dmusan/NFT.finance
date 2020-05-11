import React from 'react'
import NewOrderCard from './NewOrderCard'
import MyCards from '../cards/MyCards'
import ModalOrder from './ModalOrder'
import '../../../css/mystyles.css'

const NewOrderPage = () => {
  return (
    <div className="container">
      <h4>Pick an NFT from your wallet for the loan</h4>
      <div className="wrapper">
        <MyCards />
      </div>
      <ModalOrder />
    </div>
  )
}

export default NewOrderPage;
