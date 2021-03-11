import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import FormSection from '../LoginSection/LoginSection';
const LoginPage = (props) => {
  return (
    <>
      <Navbar />
      <FormSection props={props} />
      <Footer />
    </>
  );
};

export default LoginPage;
