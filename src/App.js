import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import LoginPage from './Containers/LoginPage/LoginPage';
import RegisterPage from './Containers/RegisterPage/RegisterPage';
import React, { useState } from 'react';
import User from './Containers/User/User';
import Contact from './Containers/Contact/Contact';
export const CredentialContext = React.createContext(null);
function App() {
  const credentialState = useState(null);
  return (
    <div className="App">
      <CredentialContext.Provider value={credentialState}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/Register" exact component={RegisterPage} />
            <Route path="/user/:id" exact component={User} />
            <Route path="/user/:id/:idContact" exact component={Contact} />
          </Switch>
        </BrowserRouter>
      </CredentialContext.Provider>
    </div>
  );
}

export default App;
