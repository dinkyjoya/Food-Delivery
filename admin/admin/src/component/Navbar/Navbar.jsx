import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
       <img className='logo' src='https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png' alt="logo" />
       <h2>Admin Panel</h2>
        <img className='profile' src={assets.profile_image} alt="profile" />

    </div>
  )
}

export default Navbar