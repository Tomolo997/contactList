import React, { Component, useContext } from 'react';
import classes from './NavbarLogout.module.css';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo.png';
import { CredentialContext } from '../../App';

function NavbarLogout() {
  const [credentials] = useContext(CredentialContext);
  return (
    <nav className={classes.NavigationBar}>
      <div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className={classes.LoginRegisterDiv}>
        <Link className={classes.NavBarLink} to="/login">
          Log out
        </Link>{' '}
      </div>
    </nav>
  );
}

export default NavbarLogout;
