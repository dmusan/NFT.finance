import React, { Component } from 'react'
import HomeCard from './HomeCard'
import '../../../css/mystyles.css'

class HomePage extends Component {

  render() {
    return (
      <div className="valign-wrapper vertical-wrapper">
        <HomeCard />
      </div>
    )
  }
}

export default HomePage;
