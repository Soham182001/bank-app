import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './Register';

function App() {
  return (
    <div className="App">
      <h1>Banking Application</h1>
      <Register></Register>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route index element={<Register/>} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
