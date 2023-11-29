import React from 'react';
import CardDeck from './components/CardDeck';
import './App.css';
import UserDeck from './components/Users';
// import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <UserDeck />
      <CardDeck />
    </div>
  );
}

export default App;
