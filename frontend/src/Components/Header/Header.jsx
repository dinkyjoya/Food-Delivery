import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
    <div className="header-contents">
        <h2>Order your favourite food here</h2>
        {/* <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining meal at a time</p> */}
        <button>View Menu</button>
    </div>
{/* 
<div className='right-side'>

<img src='https://images.pexels.com/photos/1510690/pexels-photo-1510690.jpeg?auto=compress&cs=tinysrgb&w=400' />
<img src='https://images.pexels.com/photos/1860204/pexels-photo-1860204.jpeg?auto=compress&cs=tinysrgb&w=600'/>
    </div> */}
    </div>
  )
}

export default Header