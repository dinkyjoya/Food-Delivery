import React, { useState } from 'react'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/frontend_assets/assets';

const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate()
  const [menu, setMenu]= useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const {getTotalCartAmount, token, setToken}=useContext(StoreContext);

  const logOut=()=>{
   localStorage.removeItem("token");
   setToken("");
    navigate("/");
  }

  const toggleMenu = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }

  const handleSearch = (e) => {
    e.preventDefault();
   if(searchItem.trim()){
    navigate(`/search?query=${encodeURIComponent(searchItem)}`);
  }else{
    navigate('/');
  }
  setSearchItem('');
}

  return (
    <div className='navbar'>
       <Link to="/"> <img src='https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png' width="100" alt="logo" /></Link>
   
        <button className='navbar-toggler' onClick={toggleMenu}>
        <i class="fa-solid fa-bars" style={{color: '#000000'}}></i>
       </button>

        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className='close-icon' onClick={toggleMenu}>
          <i className="fa-solid fa-xmark"></i>
        </button>
           <Link to='/' onClick={()=>setMenu("home")} className={menu === "home" ? "active": ""}>Home</Link>
           <Link to='/explore' onClick={()=>setMenu("menu")} className={menu === "menu"? "active": ""}>Menu</Link>
           <Link to='/app-download' onClick={()=>setMenu("Mobile-app")} className={menu=== "Mobile-app" ? "active": ""}>Mobile-app</Link>
           <Link to='/contact' onClick={()=>setMenu("Contact us")} className={menu === "Contact us" ? "active": ""}>Contact us</Link>
        </div>
        <div className="navbar-right">
        <form onSubmit={handleSearch} className="navbar-search-form">
          <input 
            type="text" 
            placeholder="Search for food..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)} 
          />
          <button type="submit"><img src={assets.search_icon} alt="Search" /></button>
        </form>
       
          <div className="navbar-search-icon">
        <Link to="/cart"><img src={assets.basket_icon}/></Link> 
          <div className={getTotalCartAmount() === 0 ? "": "dot"}></div>
          </div>
         
          {!token
          ? <button onClick={()=>setShowLogin(true)}  className='sign-in-button'>Sign in</button>
          : <div className='navbar-profile'>
           <img src={assets.profile_icon} alt="" />
           <ul className='nav-profile-dropdown'>
            <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            <hr />
            <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
           </ul>
            </div>}
            
        </div>
    </div>
  )
}

export default Navbar