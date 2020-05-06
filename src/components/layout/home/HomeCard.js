import React from 'react'
import { NavLink } from 'react-router-dom'

const HomeCard = () => {
  return (
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card blue-grey center-align">
          <div class="card-content white-text">
            <span class="card-title">Get Started</span>
            <br/>
            <p>
              New users are advised to check the
              <NavLink to='/docs' class="white-text bold"><b> docs</b></NavLink> first to take full advantage
              of all the features
            </p>
            <br/>
          </div>
          <div class="card-action">
            <NavLink to='/neworder'>Place new order</NavLink>
          </div>
          <div class="card-action">
            <NavLink to='/allorders'>View all pending orders</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCard;
