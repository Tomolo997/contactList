import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import LoginPage from './Containers/LoginPage/LoginPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/Register" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
