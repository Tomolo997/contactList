import classes from './LoginSection.module.css';
import React from 'react';

const FormSection = () => {
  return (
    <div className={classes.LoginSection}>
      <form className={classes.FormLogin} action="">
        <label className={classes.LabelForm} htmlFor="username">
          Email
        </label>
        <input className={classes.Input} type="text" name="username" />
        <label className={classes.LabelForm} htmlFor="password">
          Password
        </label>
        <input className={classes.Input} type="password" name="password" />{' '}
        <br />
        <button className={classes.LoginButton} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default FormSection;
