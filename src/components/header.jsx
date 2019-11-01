import React from "react";
import "../styles/header.scss";
import logo from "../assets/bluestacks_logo_cut.png";
function AppHeader() {
  return (
    <React.Fragment>
      <main className="app-header d-flex align-items-center">
        <header className="app-header-logo d-flex">
          <img alt="Bluestacks logo" src={logo} width="50px" height="45px" />
          <div className="d-flex flex-column ml-3 mt-2">
            <span>BlueStacks</span>
            <span>Play Bigger</span>
          </div>
        </header>
      </main>
    </React.Fragment>
  );
}

export default AppHeader;
