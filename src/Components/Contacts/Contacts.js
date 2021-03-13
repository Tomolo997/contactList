import classes from './Contacts.module.css';
import React, { useState, useContext, useEffect } from 'react';
import { CredentialContext } from '../../App';
const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const [credentials] = useContext(CredentialContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
          setContacts(contacts.contacts);
          console.log(credentials);
        } else return;
      });
  }, []);

  const persist = (newContacts) => {
    fetch('http://localhost:4000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newContacts),
    }).then(() => {
      //if we registered correctly we go to the homepage
    });
  };

  const appendContact = (e) => {
    e.preventDefault();
    //...contacts => copy old array
    const newContact = {
      id: '2',
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    };
    setContacts([...contacts, newContact]);
    const newContacts = [...contacts, newContact];
    persist(newContacts);
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
  };

  const editContact = () => {};

  let contactsMap = contacts.map((contact) => {
    return (
      <div className={classes.Contact} key={contact._id}>
        <div className={classes.Firstname}>
          First name:{' '}
          <span className={classes.FirstNameSpan}>{contact.firstName}</span>
        </div>
        <div className={classes.Firstname}>
          Last name:{' '}
          <span className={classes.FirstNameSpan}>{contact.lastName}</span>
        </div>
        <div className={classes.Firstname}>
          Phone number:{' '}
          <span className={classes.FirstNameSpan}>{contact.phoneNumber}</span>
        </div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
  });

  return (
    <div className={classes.Contacts}>
      {credentials ? contactsMap : null}

      <br />
      <form
        onSubmit={appendContact}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="firstName">
          First name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
          />
        </label>
        <label htmlFor="lastName">
          Last name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            type="text"
          />
        </label>
        <label htmlFor="phoneNumber">
          Phone number
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phoneNumber"
            type="text"
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Contacts;
