import React, { useState, useEffect, useContext } from 'react';
import NavbarGoBackToUser from '../../Components/NavbarGoBackToUser/NavBarGoBackToUser';
import Footer from '../../Components/Footer/Footer';
import { CredentialContext } from '../../App';
import classes from '../Contact/Contact.module.css';

const Contact = (props) => {
  const [credentials] = useContext(CredentialContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const fillOutTheContact = (contacts) => {
    const contact = contacts.find(
      (el) => el._id === props.match.params.idContact
    );
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setPhoneNumber(contact.phoneNumber);
    console.log(contact);
  };
  useEffect(() => {
    fetch('http://localhost:4000/contacts', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then(
        (res) => {
          return res.json();
        }
        //if we registered correctly we go to the homepage
      )
      .then((contacts) => {
        if (contacts !== null) {
          fillOutTheContact(contacts.contacts);
        } else return;
      });
  }, []);
  return (
    <div>
      <NavbarGoBackToUser />
      <div className={classes.Contact}>
        <div className={classes.ContactInfo}>
          <div>First name: {firstName}</div>
          <div>Last name: {lastName}</div>
          <div>phone number: {phoneNumber}</div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
