import React from 'react'
import { NavLink } from 'react-router-dom'

const HomeCard = () => {
  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card indigo lighten-1 center-align">
          <div className="card-content white-text">
            <span className="card-title white-text">Get Started</span>
            <br/>
            <p>
              New users are encouraged to check the Docs
              to take advantage of all the features and leverage their NFTs
            </p>
            <br/>
          </div>
          <div className="card-action">
            <NavLink to='/' className="amber-text text-lighten-1">Docs</NavLink>
          </div>
          <div className="card-action">
            <NavLink to='/' className="amber-text text-lighten-1">Create Lease Offer</NavLink>
          </div>
          <div className="card-action">
            <NavLink to='/' className="amber-text text-lighten-1">Create Loan Request</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCard;
