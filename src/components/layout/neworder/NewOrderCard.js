import React from 'react'
import { NavLink } from 'react-router-dom'

const NewOrderCard = () => {
  return (
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card blue-grey center-align">
          <div class="card-content white-text">
            <span class="card-title">New Order</span>
            <br/>
            <p>
              Specify the details of your loan:
            </p>
            <br/>
          </div>
          <div class="row">
            <div class="input-field col s6 m6 offset-s1 offset-m1">
              <input id="email" type="email" class="validate" />
              <label for="email">Email</label>
            </div>
          </div>
          <div class="card-action">
            <NavLink to='/neworder'>Place new order</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewOrderCard;
