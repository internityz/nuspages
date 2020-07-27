import React, { Component } from "react";
import axios from "axios";

function deletePost(id) {
  axios({
    method: "DELETE",
    url: `http://${window.location.hostname}:5000/cards/${id}`,
    withCredentials: true,
  }).then((res) => {
    window.location.href = `http://${window.location.hostname}:3000/user/${res.data}`;
  });
}

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }
  render() {
    const image = `url(${this.props.image})`;
    return (
      <div className="columns is-centered">
        <div className="card-post">
          <div className="wrapper" style={{ "background-image": image }}>
            <div className="data">
              <div className="content">
                <h1 className="title">{this.props.title}</h1>
                <p className="text">
                  {this.props.content} <br /> <br />
                  <h6> {this.props.footer}</h6>
                  <br />
                </p>
                <label className="menu-button" onClick={this.toggleMenu}>
                  <span></span>
                </label>
              </div>
              <ul
                className={
                  this.state.active ? "menu-content active" : "menu-content"
                }
              >
                <li>
                  <a href={`/editor?id=${this.props.id}`}>
                    <i className="fas fa-edit" />
                    <span>Edit</span>
                  </a>
                </li>
                <li>
                  <a onClick={() => deletePost(this.props.id)}>
                    {" "}
                    <i className="fas fa-trash-alt" />
                    <span>Delete</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
