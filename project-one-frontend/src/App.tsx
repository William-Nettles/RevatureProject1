
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Authentication/Login';
import { Home } from './components/Home/Home';
import { Register } from './components/Authentication/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Login/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
