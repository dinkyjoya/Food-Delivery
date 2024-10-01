import React, { useState } from 'react';
import './ContactForm.css';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const [userData, setUserData] = useState({
        name:'',
        email:'',
        message:'',

});
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        
    const serviceId = 'service_xhm81c5';
    const templateId ='template_scf293i';
    const publicKey='-g4yWitmwmMo2IDN9';

    const templateParams={
        from_name:userData.name,
        from_email:userData.email,
        to_name: 'dinky',
        message: userData.message,
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response)=>{
        console.log('email sent successfully!', response);
    })
.catch((error)=>{
    console.log('error sending email:', error);
})
    };


    return (
        <div className="contact-form">
            {submitted ? (
                <p>Thank you! We have received your message.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h3>Contact Us</h3>
                    <label htmlFor="name">Name</label>
                    <input type="text" value={userData.name} id="name" name="name" onChange={(e)=>setUserData({...userData, name: e.target.value})} required />
                    <label htmlFor="email">Email</label>
                    <input type="email" value={userData.email} id="email" name="email" onChange={(e)=>setUserData({...userData,email: e.target.value})} required />
                    <label htmlFor="message">Message</label>
                    <textarea id="message" value={userData.message} name="message" onChange={(e)=>setUserData({...userData, message:e.target.value})} required />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};


export default ContactForm;
