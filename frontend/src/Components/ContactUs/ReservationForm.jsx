import React, { useState } from 'react';
import './ReservationForm.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

 const ReservationForm = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        
        <form className="reservation-form">
            <h3>Make a Reservation</h3>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
            <input type="time" name="time" placeholder="Select Time"/>
            <input type="number" name="people" placeholder="Number of People" />
            <button type="submit">Book Now</button>
        </form>
    );
};

export const OperatingHours = () => {
    return (
        <div className="operating-hours">
            <h3>Operating Hours</h3>
            <p>Monday - Friday: 9 AM - 10 PM</p>
            <p>Saturday - Sunday: 10 AM - 11 PM</p>
        </div>
    );
};

const CombinedComponent = () => {
    return (
        <div className="reservation-container">
            <OperatingHours />
            <ReservationForm />
        </div>
    );
};




export default CombinedComponent;
