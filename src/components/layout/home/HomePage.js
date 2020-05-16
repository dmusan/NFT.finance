import React from 'react'
import HomeCard from './HomeCard'
import '../../../css/mystyles.css'

import GetLendingOffers from '../../web3/GetLendingOffers.js'

const HomePage = () => {
  return (
    <div className="valign-wrapper vertical-wrapper">
      <HomeCard />
      { /* TODO: remove GetLendingOffers */}
      <GetLendingOffers />
    </div>
  )
}
export default HomePage;
