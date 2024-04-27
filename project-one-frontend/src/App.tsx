
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Authentication/Login';
import { Register } from './components/Authentication/Register';
import { NewReim } from './components/ReimbursementPortal/NewReim';
import { Home } from './components/Home/Home';
import { Reimbursements } from './components/ReimbursementPortal/ReimPortal';
import { AllReims } from './components/ReimbursementPortal/AllReims';
import { Pending } from './components/ReimbursementPortal/Pending';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='reimbursements/new' element={<NewReim/>}/>
          <Route path='/reimbursements' element={<Reimbursements/>}/>
          <Route path='reimbursements/all' element={<AllReims/>}/>
          <Route path='reimbursements/pending' element={<Pending/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
