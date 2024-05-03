import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Authentication/Login';
import { Register } from './components/Authentication/Register';
import { NewReim } from './components/ReimbursementPortal/NewReim';
import { Home } from './components/Home/Home';
import { Reimbursements } from './components/ReimbursementPortal/ReimPortal';
import { AllReims } from './components/ReimbursementPortal/AllReimsContainer';
import { Pending } from './components/ReimbursementPortal/PendingReimsContainer';
import { Account } from './components/Account/Account';
import { Logout } from './components/Authentication/Logout';

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
          <Route path='/reimbursements/all' element={<AllReims/>}/>
          <Route path='/reimbursements/pending' element={<Pending/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
