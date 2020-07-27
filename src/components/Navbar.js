import React, { Component } from "react";
import Login from "./Login";
import ThemeSelecter from "./ThemeSelecter";

function toggleMenu() {
  document
    .getElementsByClassName("navbar-burger")[0]
    .classList.toggle("is-active");
  document
    .getElementsByClassName("navbar-menu")[0]
    .classList.toggle("is-active");
}

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav
        className={this.props.getTheme() ? "navbar is-info" : "navbar is-dark"}
      >
        <div className="navbar-brand">
          <a href="/">
            <strong>NUSPages</strong>
          </a>
          <a className="navbar-burger" onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <ThemeSelecter
              themeSelector={this.props.themeSelector}
              getTheme={this.props.getTheme}
            />
          </div>
          <Login username={this.state.username} />
        </div>
      </nav>
    );
  }
}
