import classes from './FirstPage.module.css';
import React from 'react';

const FirstPage = () => {
  return (
    <div className={classes.FirstPage}>
      <h1 className={classes.Heading1}>
        Contact<span className={classes.ListSpan}>List</span>{' '}
      </h1>
      <p className={classes.Paragraph}>Sign up to manage your Contact list</p>
    </div>
  );
};

export default FirstPage;
