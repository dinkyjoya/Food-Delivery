import React,{useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext';
import FoodItem from '../../FoodItem/FoodItem';
import Footer from '../../footer/Footer';

const SearchResult = () => {
    const {food_list} = useContext(StoreContext);
    const location = useLocation();                                          //URL which contains the search query entered by the user.
    const query = new URLSearchParams(location.search).get('query');        //This code extracts the query parameter from the URL

    const filteredItems = food_list.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||

        item.description.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div className='search-results'>
<h2>Searched Results for {query}</h2>
<div className="food-display-list">
    {filteredItems.map((item,index)=>(
        <FoodItem 
        key={index}
        id={item._id}
        name={item.name}
        description={item.description}
        price={item.price}
        image={item.image}/>
    ))}
</div>
    </div>
  )
}
<Footer/>

export default SearchResult