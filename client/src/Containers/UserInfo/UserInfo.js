import classes from './UserInfo.module.css';
import React, { Component, useContext } from 'react';
import { CredentialContext } from '../../App';
import Contacts from '../../Components/Contacts/Contacts';
function UserInfo() {
  const [credentials] = useContext(CredentialContext);
  let showWelcome = (
    <div>
      <h1 className={classes.Heading1}>
        Contact<span className={classes.ListSpan}>List</span>{' '}
      </h1>
      <p className={classes.Paragraph}>Sign up to manage your Contact list</p>
      <p className={classes.Paragraph}></p>
    </div>
  );
  return (
    <div className={classes.FirstPage}>
      {credentials ? (
        <h1 className={classes.Welcome}>
          {' '}
          Welcome {credentials && credentials.username}
        </h1>
      ) : (
        showWelcome
      )}

      {/* if the credentials are valid and they exist then base out the Contacts */}
      {credentials && <Contacts />}
    </div>
  );
}

export default UserInfo;
