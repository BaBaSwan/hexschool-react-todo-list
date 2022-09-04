import './App.css';

// import React from 'react'
import { Routes, Route, Link } from "react-router-dom";

import Login from './components/Login'
import ToDo from './components/Todo'
import SignUp from './components/SignUp'

function App () {
  return (
    <div>
      {/* <SignUp /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="todo" element={<ToDo />} />
      </Routes>
    </div>
  );
}

export default App;
