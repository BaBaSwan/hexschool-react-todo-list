import './App.css';

import { createContext, useState } from 'react'
import { Routes, Route } from "react-router-dom";

import Login from './components/Login'
import ToDo from './components/Todo'
import SignUp from './components/SignUp'


// import React from 'react'

const MyContext = createContext()

function App () {
  const [nickname, setNickname] = useState('')
  const state = { nickname, setNickname }
  return (
    <MyContext.Provider value={state}>
      {/* <SignUp /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="todo" element={<ToDo />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
