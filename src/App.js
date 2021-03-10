import './App.css';
import Navbar from './Container/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import FirstPage from './Components/FirstPage/FirstPage';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <FirstPage />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
