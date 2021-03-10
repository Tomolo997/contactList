import classes from './RegisterForm.module.css';
import React from 'react';

const RegisterForm = () => {
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
        <label className={classes.LabelForm} htmlFor="password">
          Confirm Password
        </label>
        <input className={classes.Input} type="password" name="password" />{' '}
        <br />
        <button className={classes.LoginButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
