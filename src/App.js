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
      },
      {
        username: 'vojka',
        password: '1233',
        id: '2',
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
            <Route path="/user/:id" exact component={User} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
