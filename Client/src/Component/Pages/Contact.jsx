import React from "react";
import Enquire from "../Contact/Enquire";
import transition from "../Global/PageTransition";
import Menu from "../Global/Menu";
import Header from "../Global/Header";
import Footer from "../Global/Footer";

const Contact = () => {
  return (
    <div>
      <Header />
      <Menu />
      <Enquire />
      <Footer />
    </div>
  );
};

export default Contact;
