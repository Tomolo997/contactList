import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo.png';
const Navbar = () => {
  return (
    <nav className={classes.NavigationBar}>
      <div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className={classes.LoginRegisterDiv}>
        <Link className={classes.NavBarLink} to="/login">
          Login
        </Link>{' '}
        <Link className={classes.NavBarLink} to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
