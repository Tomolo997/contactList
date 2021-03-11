import classes from './LoginSection.module.css';
import React, { Component } from 'react';

class FormSection extends Component {
  state = {
    username: '',
    password: '',
  };
  findIfUserExists = (e) => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props);
  };
  handleEmailChange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div className={classes.LoginSection}>
        <form className={classes.FormLogin} action="">
          <label className={classes.LabelForm} htmlFor="username">
            Email
          </label>
          <input
            className={classes.Input}
            onChange={this.handleEmailChange}
            type="text"
            name="username"
          />
          <label className={classes.LabelForm} htmlFor="password">
            Password
          </label>
          <input
            className={classes.Input}
            onChange={this.handlePasswordChange}
            type="password"
            name="password"
          />{' '}
          <br />
          <button
            onClick={this.findIfUserExists}
            className={classes.LoginButton}
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default FormSection;
