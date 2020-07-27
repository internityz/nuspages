import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <form action="/search" className="navbar-item">
        <div className="field has-addons" id="search-bar">
          <div className="control is-expanded has-icons-left">
            <input
              className="input"
              name="username"
              placeholder="Find a blog"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </div>
          <div className="control">
            <button className="button is-link">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}
