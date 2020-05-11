import React from 'react'
import '../../../css/mystyles.css'
import SingleMyCard from "./SingleMyCard"

const MyCards = () => {
  return (
    <div className="row">
    <div class="col s12 m12">
      <ul className="tabs wrapper">
        <SingleMyCard />

      </ul>
    </div>
    </div>
  )
}

export default MyCards;
