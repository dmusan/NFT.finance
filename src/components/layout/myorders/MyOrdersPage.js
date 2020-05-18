import React from 'react'
import AllOffers from '../order/AllOffers'
import GetLendingOffers from '../../web3/GetLendingOffers.js'
import '../../../css/mystyles.css'

const MyOrdersPage = () => {
  return (
    <div class="container margin-container">
      <GetLendingOffers />
      <div class='row'>
        <div class='col s12 m4'>
          <p>Filter by:</p>
          <p><b>Pending</b></p>
          <p><b>Received counter offer</b></p>
          <p><b>Cancelled</b></p>
          <p><b>Defaulted</b></p>
        </div>
        <div class='col s12 m8'>
          <AllOffers offersFilterLender={""} offersFilterBorrower={""}/>
        </div>
      </div>
    </div>
  )
}

export default MyOrdersPage;
