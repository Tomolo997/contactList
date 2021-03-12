import classes from './LoginSection.module.css';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CredentialContext } from '../../App';

function FormSection() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setCredentials] = useContext(CredentialContext);
  const handleError = async (res) => {
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    return res.json();
  };
  const login = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/login', {
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
  };
  const history = useHistory();
  return (
    <div className={classes.LoginSection}>
      {error}
      <form onSubmit={login} className={classes.FormLogin} action="">
        <label className={classes.LabelForm} htmlFor="username">
          Email
        </label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className={classes.Input}
          type="text"
          name="username"
        />
        <label className={classes.LabelForm} htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={classes.Input}
          type="password"
          name="password"
        />{' '}
        <br />
        <button className={classes.LoginButton} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default FormSection;
