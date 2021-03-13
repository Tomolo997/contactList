import classes from './FirstPage.module.css';
import React, { useContext } from 'react';
import { CredentialContext } from '../../App';
import Contacts from '../Contacts/Contacts';
const FirstPage = () => {
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
      <h1 className={classes.Welcome}> Welcome</h1>
      <h1 className={classes.Welcome}> Sign up or login</h1>
    </div>
  );
};

export default FirstPage;
