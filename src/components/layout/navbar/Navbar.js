import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLinks from './NavbarLinks'
import GetOffersAssets from '../../web3/opensea/GetOffersAssets'


const Navbar = () => {
  return (
    <nav className="nav-wrapper blue-grey darken-2">
      <div className="container">
        {/* <GetOffersAssets /> */}
        <Link to='/' className="brand-logo left-align">NFT.finance</Link>
        <NavbarLinks/>
      </div>
    </nav>
  )
}

export default Navbar;
