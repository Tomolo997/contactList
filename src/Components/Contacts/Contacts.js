import classes from './Contacts.module.css';
import React, { useState, useContext, useEffect } from 'react';
import { CredentialContext } from '../../App';
import { Link } from 'react-router-dom';
const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const [credentials] = useContext(CredentialContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorWithCredentials, seterrorWithCredentials] = useState(false);

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
        } else return;
      });
  }, [contacts]);

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
    if (firstName === '' || lastName === '' || phoneNumber === '') {
      e.preventDefault();

      seterrorWithCredentials(true);
      return null;
    }

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
    seterrorWithCredentials(false);
  };

  let contactsMap = contacts.map((contact) => {
    return (
      <Link to={`/user/${credentials.username}/${contact._id}`}>
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
        </div>
      </Link>
    );
  });

  return (
    <div className={classes.Contacts}>
      <form
        onSubmit={appendContact}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="firstName">
          <span className={classes.FormSpan}> First name </span>
          <input
            className={classes.InputForm}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
          />
        </label>
        <label htmlFor="lastName">
          <span className={classes.FormSpan}> Last name</span>
          <input
            className={classes.InputForm}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            type="text"
          />
        </label>
        <label htmlFor="phoneNumber">
          <span className={classes.FormSpan}> Phone number</span>
          <input
            className={classes.InputForm}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phoneNumber"
            type="text"
          />
        </label>
        {errorWithCredentials ? (
          <p className={classes.InvalidCredentails}>Invalid credentials</p>
        ) : null}

        <button className={classes.AddButton} type="submit">
          Add
        </button>
      </form>
      <br />
      <div className={classes.ContactsScroll}>
        {credentials ? contactsMap : null}
      </div>
    </div>
  );
};

export default Contacts;
