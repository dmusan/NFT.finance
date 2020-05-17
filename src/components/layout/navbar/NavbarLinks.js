import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to='/neworder'>Lend NFTs</NavLink></li>
      <li><NavLink to='/neworder'>Request Loan</NavLink></li>
      <li><NavLink to='/myorders'>My Offers</NavLink></li>
      <li><NavLink to='/allorders'>Borrow NFTs</NavLink></li>
      <li><NavLink to='/allorders'>All Loans</NavLink></li>
      <li><NavLink to='/' class='orange-text'>Docs</NavLink></li>
    </ul>
  )
}

export default NavbarLinks;
