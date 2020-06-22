import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  return (
    <nav className="nav-wrapper indigo lighten-1">
      <div className="container">
        <Link to='/' className="brand-logo left-align">NFT.finance <sub>Beta</sub></Link>
        <NavbarLinks/>
      </div>
    </nav>
  )
}

export default Navbar;
