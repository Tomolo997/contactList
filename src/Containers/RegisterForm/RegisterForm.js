import classes from './RegisterForm.module.css';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { CredentialContext } from '../../App';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [mathcing, setMathcing] = useState(true);
  const [error, setError] = useState('');
  const [, setCredentials] = useContext(CredentialContext);

  //handle errors
  const handleError = async (res) => {
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    return res.json();
  };
  const regiserNewUser = (e) => {
    e.preventDefault();
    if (passwordRepeat === password) {
      setMathcing(true);
      fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then(handleError)
        .then(() => {
          setError('');
          //if we registered correctly we go to the homepage
          setCredentials({ username, password });
          history.push('/');
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setMathcing(false);
      return;
    }
  };
  const history = useHistory();
  return (
    <div className={classes.LoginSection}>
      {error}
      <form onSubmit={regiserNewUser} className={classes.FormLogin} action="">
        <label className={classes.LabelForm} htmlFor="username_register">
          Email
        </label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className={classes.Input}
          type="text"
          name="username_register"
        />
        <label className={classes.LabelForm} htmlFor="password_register">
          Password
        </label>
        <input
          className={classes.Input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
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
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />{' '}
        {!mathcing ? <h3>passwords are not mathcing</h3> : null}
        <br />
        <button className={classes.LoginButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
