import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo left-align">DOTC.market</Link>
        <NavbarLinks/>
      </div>
    </nav>
  )
}

export default Navbar;
