import React from 'react';
import './MapContainer.css'
const MapContainer = () => {
    return (
        <div className='address'>
            <address>
                <b>
            Pizza from Mexico, Field Ganj <br/>
               Ludhiana-141008    
               </b>     
                 </address>
                 <div className='responsive-map'>
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3297.2999507265995!2d75.8568768056997!3d30.907959322278465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83cf699ad8af%3A0xc968eb2ddda6854b!2sPizza%20from%20Mexico!5e0!3m2!1sen!2sin!4v1723977506313!5m2!1sen!2sin" style={{width:"600" ,height:"450"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                 </div>
        
        </div>
    );
};



export default MapContainer
