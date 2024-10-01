import React from "react";
import MapContainer from "./MapContainer";
import ContactForm from "./ContactForm.jsx";
import ReservationForm from "./ReservationForm.jsx";
import Footer from "../footer/Footer.jsx";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <MapContainer />
      <ReservationForm />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactUs;
