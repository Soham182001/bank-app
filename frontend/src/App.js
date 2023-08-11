import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import Register from './Register';
import HomePage from './homePage';
import Login from './login';
import WelcomePage from './welcome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<HomePage/>} />
          <Route path='/welcome' element={<WelcomePage/>} />

          <Route index element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
