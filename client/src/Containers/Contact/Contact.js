import React, { useState, useEffect, useContext } from 'react';
import NavbarGoBackToUser from '../../Components/NavbarGoBackToUser/NavBarGoBackToUser';
import Footer from '../../Components/Footer/Footer';
import { CredentialContext } from '../../App';
import classes from '../Contact/Contact.module.css';
import { Link, useHistory } from 'react-router-dom';

const Contact = (props) => {
  const [credentials] = useContext(CredentialContext);
  const [firstName, setFirstName] = useState('');
  const [update, setUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [finalUpdate, setFinalUpdate] = useState(false);
  const [id, setId] = useState('');

  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');

  const fillOutTheContact = (contacts) => {
    const contact = contacts.find(
      (el) => el._id === props.match.params.idContact
    );
    setId(contact._id);
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setPhoneNumber(contact.phoneNumber);
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
  }, [finalUpdate]);

  const deleteUser = (id) => {
    fetch(`http://localhost:4000/contact/${credentials.username}/` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    });
    setDeleted(true);
  };

  const ToggleUpdate = () => {
    setUpdate(!update);
  };

  const updateIt = () => {
    //fetch
    fetch(
      `http://localhost:4000/contact/${credentials.username}/` +
        props.match.params.idContact,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        body: JSON.stringify({
          firstName: updatedFirstName,
          lastName: updatedLastName,
          phoneNumber: updatedPhoneNumber,
        }),
      }
    );
    setFinalUpdate(!finalUpdate);
    setUpdate(!update);
  };

  let UpdateMe = (
    <div>
      <div>
        First name:{' '}
        <input
          onChange={(e) => setUpdatedFirstName(e.target.value)}
          type="text"
        />
      </div>
      <div>
        Last name:{' '}
        <input
          onChange={(e) => setUpdatedLastName(e.target.value)}
          type="text"
        />
      </div>
      <div>
        phone number:{' '}
        <input
          onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
          type="text"
        />
      </div>

      <button onClick={updateIt}>Update Me</button>
    </div>
  );

  return (
    <div>
      <NavbarGoBackToUser />
      <div className={classes.Contact}>
        {!deleted ? (
          <div className={classes.ContactInfo}>
            <div className={classes.ContactInfoDiv}>
              First name: {firstName}
            </div>
            <div className={classes.ContactInfoDiv}>Last name: {lastName}</div>
            <div className={classes.ContactInfoDiv}>
              phone number: {phoneNumber}
            </div>
            <div className={classes.ButtonsDiv}>
              <button className={classes.Button} onClick={() => deleteUser(id)}>
                Delete
              </button>
              <button className={classes.Button} onClick={ToggleUpdate}>
                Update
              </button>
            </div>
            {update ? <div className={classes.UpdateMe}>{UpdateMe}</div> : null}
          </div>
        ) : (
          <Link
            className={classes.ReturnHomeLink}
            to={'/user/' + credentials.username}
          >
            Return back to the user
          </Link>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
