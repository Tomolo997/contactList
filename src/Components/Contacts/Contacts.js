import React, { useState, useContext, useEffect } from 'react';
import { CredentialContext } from '../../App';
const Contacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: '1',
      firstName: 'Tomaz',
      lastName: 'Ovsenjak',
      phoneNumber: '031258407',
    },
  ]);

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
        (res) => res.json()
        //if we registered correctly we go to the homepage
      )
      .then(({ contacts }) => {
        console.log(contacts);
        setContacts(contacts);
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

  return (
    <div>
      {contacts.map((contact) => {
        return (
          <div key={contact._id}>
            <div>
              First name: <span>{contact.firstName} </span>
            </div>
            <div>
              Last name: <span>{contact.lastName}</span>
            </div>
            <div>
              Phone number: <span>{contact.phoneNumber}</span>
            </div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        );
      })}

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
