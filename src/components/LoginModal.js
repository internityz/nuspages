import React, { Component } from "react";

function toggleModal() {
  document.getElementById("login-form").classList.toggle("is-active");
}

export default class LoginModal extends Component {
  render() {
    return (
      <div className="modal" id="login-form">
        <div className="modal-background" onClick={toggleModal} />
        <form action={`http://${window.location.hostname}:5000/auth/login`} method="POST">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input" name="username" placeholder="NUSNET ID" />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input className="input" name="password" type="password" placeholder="Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-primary">Login</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
