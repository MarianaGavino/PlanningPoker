import React from 'react';
// import {Routes, Route} from "react-router-dom"
import './App.css';
import UserDeck1 from './components/Users1';
import Rules from './components/Rules';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      
        <Rules />
        {/* <Home /> */}
        <UserDeck1 />
      
      
      
    </div>
  );
}

export default App;
