import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";

class NavbarLinks extends Component {

  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
      // TODO change comments?
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      coverTrigger: false, // Displays dropdown below the button
    });
  }

  render() {
    return (
      <div>
        <ul id="nav-dropdown-leasing" className="dropdown-content">
          <li><NavLink to='/newlease' className='indigo-text text-darken-4'>New Lease Offer</NavLink></li>
          <li className="divider"></li>
          <li><NavLink to="/myleaseoffers" className='indigo-text text-darken-4'>My Lease Offers</NavLink></li>
          <li className="divider"></li>
          <li><NavLink to="/allorders" className='indigo-text text-darken-4'>All Lease Offers</NavLink></li>
        </ul>

        <ul id="nav-dropdown-lending" className="dropdown-content">
          <li><NavLink to='/allorders' className='indigo-text text-darken-4'>New Loan Request</NavLink></li>
          <li className="divider"></li>
          <li><NavLink to="/allorders" className='indigo-text text-darken-4'>My Loan Requests</NavLink></li>
          <li className="divider"></li>
          <li><NavLink to="/allorders" className='indigo-text text-darken-4'>All Loan Requests</NavLink></li>
        </ul>

        <ul className="right">
          {
          /*
          // TODO: remove
          <li><NavLink to='/neworder'>Lend NFTs</NavLink></li>
          <li><NavLink to='/neworder'>Request Loan</NavLink></li>
          <li><NavLink to='/myorders'>My Offers</NavLink></li>
          <li><NavLink to='/allorders'>Borrow NFTs</NavLink></li>
          <li><NavLink to='/allorders'>All Loans</NavLink></li>
          */
          }
          <li>
            <a className="dropdown-trigger" data-target="nav-dropdown-leasing">
              Leasing
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
          <li>
            <a className="dropdown-trigger" data-target="nav-dropdown-leasing">
              Lending
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
          <li><NavLink to='/'>Chat</NavLink></li>
          <li><NavLink to='/' className='amber-text text-lighten-1'>Docs</NavLink></li>
        </ul>
      </div>
    )
  }
}

export default NavbarLinks;
