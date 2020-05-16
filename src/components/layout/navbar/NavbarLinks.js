import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to='/neworder'>New Loan Request</NavLink></li>
      <li><NavLink to='/myorders'>My Loans</NavLink></li>
      <li><NavLink to='/allorders'>View All Loans</NavLink></li>
      <li><NavLink to='/' class='orange-text'>Docs</NavLink></li>
    </ul>
  )
}

export default NavbarLinks;
