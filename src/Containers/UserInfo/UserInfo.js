import classes from './UserInfo.module.css';
import React, { Component } from 'react';

class UserInfo extends Component {
  state = {
    username: '',
    password: '',
    contacts: [],
  };
  componentDidMount() {
    console.log(this.props.props.users);
    const user = this.props.props.users.find(
      (el) => el.id === this.props.props.match.params.id
    );
    console.log(user);
    this.setState({ username: user.username, contacts: user.contacts });
  }
  render() {
    let contacts = <p>This user has no contacts</p>;

    return (
      <div className={classes.UserInfo}>
        <div className={classes.Username}>
          <div>
            {this.state.contacts.length > 0
              ? this.state.contacts.map((el) => {
                  return <p>{el.firstName}</p>;
                })
              : contacts}
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
