import React, {useState} from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/foodDisplay/FoodDisplay'
import Footer from '../../Components/footer/Footer';
import AppDownload from '../../Components/AppDownload/AppDownload';
import Cart from '../Cart/Cart';


const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
  
    <div className='container'>
      {/* <img src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1000" 
      class="background-image"/> */}
    
      <Header/>
    <ExploreMenu category={category} setCategory={setCategory}/>
<FoodDisplay category={category }/>
<AppDownload/>

{/* <Cart /> */}
  

  

    </div>
     </>
  )
}

export default Home