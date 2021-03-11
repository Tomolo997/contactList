import classes from './RegisterForm.module.css';
import React from 'react';

const RegisterForm = () => {
  return (
    <div className={classes.LoginSection}>
      <form className={classes.FormLogin} action="">
        <label className={classes.LabelForm} htmlFor="username_register">
          Email
        </label>
        <input className={classes.Input} type="text" name="username_register" />
        <label className={classes.LabelForm} htmlFor="password_register">
          Password
        </label>
        <input
          className={classes.Input}
          type="password"
          name="password_register"
        />{' '}
        <label
          className={classes.LabelForm}
          htmlFor="password_confirm_register"
        >
          Confirm Password
        </label>
        <input
          className={classes.Input}
          type="password"
          name="password_confirm_register"
        />{' '}
        <br />
        <button className={classes.LoginButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
