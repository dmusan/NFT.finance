import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to='/'>New Order</NavLink></li>
      <li><NavLink to='/'>My Orders</NavLink></li>
      <li><NavLink to='/'>View all orders</NavLink></li>
      <li><NavLink to='/' class='orange-text'>Docs</NavLink></li>
    </ul>
  )
}

export default NavbarLinks;
