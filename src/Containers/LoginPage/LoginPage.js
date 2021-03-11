import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import FormSection from '../LoginSection/LoginSection';
const LoginPage = (props) => {
  return (
    <>
      <Navbar />
      <FormSection props={props} history={props.history} />
      <Footer />
    </>
  );
};

export default LoginPage;
