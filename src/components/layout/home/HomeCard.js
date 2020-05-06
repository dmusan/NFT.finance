import React from 'react'

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
              <a href="#" class="white-text bold"><b> docs</b></a> first to take full advantage
              of all the features
            </p>
            <br/>
          </div>
          <div class="card-action">
            <a href="#">Place new order</a>
          </div>
          <div class="card-action">
            <a href="#">View all pending orders</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCard;
