import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import LoginPage from './Containers/LoginPage/LoginPage';
import RegisterPage from './Containers/RegisterPage/RegisterPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/Register" exact component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
