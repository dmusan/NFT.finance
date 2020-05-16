import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  return (
    <nav className="nav-wrapper blue-grey darken-2">
      <div className="container">
        <Link to='/' className="brand-logo left-align">NFT.finance</Link>
        <NavbarLinks/>
      </div>
    </nav>
  )
}

export default Navbar;
