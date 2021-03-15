import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import UserInfo from '../UserInfo/UserInfo';
import NavbarLogout from '../../Components/NavbarLogout/NavbarLogout';
export default class User extends Component {
  render() {
    return (
      <div>
        <NavbarLogout />
        <UserInfo props={this.props} />
        <Footer />
      </div>
    );
  }
}
