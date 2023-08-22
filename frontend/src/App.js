import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import Register from './components/register/Register';
import HomePage from './components/homepage/homePage';
import Login from './components/login/login';
import WelcomePage from './components/homepage/welcome';
import ChangePassword from './components/login/changePassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<HomePage/>} />
          <Route path='/welcome/*' element={<WelcomePage/>} />
          <Route path='/changepassword' element={<ChangePassword/>}/>
          <Route index element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
