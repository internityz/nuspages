import React, { Component } from "react";
import axios from "axios";

function toggleModal() {
  document.getElementById("login-form").classList.toggle("is-active");
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const u = this.state.username;
    if (u) {
      return (
        <div className="navbar-end">
          <a className="navbar-item" href={`/user/${u}`}>
            {u}
          </a>
          <a className="navbar-item" href={`http://${window.location.hostname}:5000/auth/logout`}>
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <div className="navbar-end">
          <a className="navbar-item" href="/about">
            About Us
          </a>
          <a className="navbar-item" onClick={toggleModal}>
            Login
          </a>
        </div>
      );
    }
  }

  componentDidMount() {
    axios
      .get(`http://${window.location.hostname}:5000/auth/check-session`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ username: res.data });
        }
      });
  }
}
