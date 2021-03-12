import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import LoginPage from './Containers/LoginPage/LoginPage';
import RegisterPage from './Containers/RegisterPage/RegisterPage';
import { Component } from 'react';
import User from './Containers/User/User';
class App extends Component {
  state = {
    users: [
      {
        username: 'tomaz',
        password: '123',
        id: '1',
        contacts: [
          {
            firstName: 'tomaz',
            lastName: 'Ovsenjak',
            phoneNumber: '031258407',
          },
          {
            firstName: 'Vojka',
            lastName: 'Vrecic',
            phoneNumber: '031569885',
          },
        ],
      },
      {
        username: 'vojka',
        password: '1233',
        id: '2',
        contacts: [
          {
            firstName: 'tomaz',
            lastName: 'Ovsenjak',
            phoneNumber: '031258407',
          },
          {
            firstName: 'Luka',
            lastName: 'Ovsenjak',
            phoneNumber: '031569885',
          },
        ],
      },
    ],
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/login"
              exact
              render={(routeProps) => (
                <LoginPage users={this.state.users} {...routeProps} />
              )}
            />
            <Route path="/Register" exact component={RegisterPage} />
            <Route
              path="/user/:id"
              exact
              render={(routeProps) => (
                <User users={this.state.users} {...routeProps} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
