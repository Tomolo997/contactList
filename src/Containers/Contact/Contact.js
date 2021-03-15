import React, { useState, useEffect, useContext } from 'react';
import NavbarGoBackToUser from '../../Components/NavbarGoBackToUser/NavBarGoBackToUser';
import Footer from '../../Components/Footer/Footer';
import { CredentialContext } from '../../App';
import classes from '../Contact/Contact.module.css';
import { Link } from 'react-router-dom';

const Contact = (props) => {
  const [credentials] = useContext(CredentialContext);
  const [firstName, setFirstName] = useState('');
  const [deleteItem, setDeleteItem] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [id, setId] = useState('');
  const fillOutTheContact = (contacts) => {
    const contact = contacts.find(
      (el) => el._id === props.match.params.idContact
    );
    setId(contact._id);
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

  const deleteUser = (id) => {
    setDeleted(true);

    fetch(`http://localhost:4000/contact/${credentials.username}/` + id, {
      method: 'DELETE',
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
        } else return;
      });
  };

  let deleteItemDiv = null;

  return (
    <div>
      <NavbarGoBackToUser />
      <div className={classes.Contact}>
        {!deleted ? (
          <div className={classes.ContactInfo}>
            <div>First name: {firstName}</div>
            <div>Last name: {lastName}</div>
            <div>phone number: {phoneNumber}</div>
            <button onClick={() => setDeleteItem(true)}>Delete</button>
            {deleteItem ? (
              <div>
                Are you sure you want to delete the item{' '}
                <button onClick={() => deleteUser(id)}>yes</button>{' '}
                <button onClick={() => setDeleteItem(false)}>no</button>{' '}
              </div>
            ) : null}
          </div>
        ) : (
          <Link to={'/user/' + credentials.username}>Return home</Link>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
