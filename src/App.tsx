import React from "react";
import "./App.css";
import FirebasePlanningPoker from "./components/FirebasePlanningPoker";
import Rules from "./components/Rules";

function App() {
  return (
    <div className="App">
      <Rules />
      <FirebasePlanningPoker />
    </div>
  );
}

export default App;
