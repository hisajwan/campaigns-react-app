import React from "react";
import "./App.scss";
import AppHeader from "./components/header";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./routes";
function App() {
  return (
    <React.Fragment>
      <Router>
        <AppHeader />
        <Routes />
      </Router>
    </React.Fragment>
  );
}

export default App;
