import classes from './FirstPage.module.css';
import React, { useContext } from 'react';
import { CredentialContext } from '../../App';
import Contacts from '../Contacts/Contacts';
const FirstPage = () => {
  const [credentials] = useContext(CredentialContext);
  return (
    <div className={classes.FirstPage}>
      <h1 className={classes.Heading1}>
        Contact<span className={classes.ListSpan}>List</span>{' '}
      </h1>
      <p className={classes.Paragraph}>Sign up to manage your Contact list</p>
      <p className={classes.Paragraph}>
        Welcome {credentials && credentials.username}
        {/* if the credentials are valid and they exist then base out the Contacts */}
      </p>
      {credentials && <Contacts />}
    </div>
  );
};

export default FirstPage;
