import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import UserInfo from '../UserInfo/UserInfo';
export default class User extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserInfo props={this.props} />
        <Footer />
      </div>
    );
  }
}
