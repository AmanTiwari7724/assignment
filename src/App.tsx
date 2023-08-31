import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateProject from './Components/CreateProject';
import { Routes, Route, Link } from "react-router-dom"
import CreateNewTask from './Components/CreateNewTask';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<CreateProject />}></Route>
      </Routes>
      <Routes>
        <Route path='/project-board/:id' element={<CreateNewTask />}></Route>
      </Routes>
    </div>
  );
}

export default App;
