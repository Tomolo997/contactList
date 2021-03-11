import classes from './UserInfo.module.css';
import React, { Component } from 'react';

class UserInfo extends Component {
  state = {
    username: '',
    password: '',
  };
  componentDidMount() {
    console.log(this.props.props.users);
    const user = this.props.props.users.find(
      (el) => el.id === this.props.props.match.params.id
    );
    console.log(user);
    this.setState({ username: user.username });
  }
  render() {
    return <div className={classes.UserInfo}>{this.state.username}</div>;
  }
}

export default UserInfo;
