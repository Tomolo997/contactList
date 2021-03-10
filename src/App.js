import './App.css';
import Navbar from './Container/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import FirstPage from './Components/FirstPage/FirstPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <FirstPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
