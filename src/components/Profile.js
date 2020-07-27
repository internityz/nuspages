import React, { Component } from "react";
import axios from "axios";

function updateAbout() {
  const a = document.getElementById("about");
  const t = document.getElementById("aboutTitle");
  t.innerText = "Saving...";
  axios
    .patch(
      `http://${window.location.hostname}:5000/profile/`,
      { content: a.innerText },
      { withCredentials: true }
    )
    .then((_) => t.innerText = "About Me");
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplay: false,
    };
    this.display = this.display.bind(this);
  }

  display() {
    this.setState({ isDisplay: !this.state.isDisplay });
  }

  render() {
    const isOwner = this.props.session === this.props.username;
    return (
      <div className="columns">
        <div
          className={
            this.state.isDisplay
              ? "column is-narrow is-centered"
              : "column is-centered"
          }
        >
          <div className="profile-container">
            <div className="profile">
              <div className="profile-wrapper">
                <a href="#">
                  <img src="/avatars/zongyu.png" alt="Profile" />
                </a>
                <div className="title">{this.props.username}</div>
                <div className="place">Singapore</div>
              </div>
              <div className="profile-content">
                <p>NUS Computing</p>
                {isOwner ? (
                  <div className="profile-buttons">
                    <div className="btn">
                      <a href="/portfolio">
                        <button>
                          <i className="far fa-clipboard" /> Portfolio
                        </button>
                      </a>
                    </div>
                    <div className="btn">
                      <a href="/editor">
                        <button>
                          <i className="fas fa-pencil-alt" /> New Card
                        </button>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div
                className="icons"
                style={isOwner ? { marginTop: -410 } : { marginTop: -350 }}
              >
                <li>
                  <a href="#" onClick={this.display}>
                    <span
                      className={
                        this.state.isDisplay
                          ? "fas fa-arrow-right"
                          : "fas fa-arrow-left"
                      }
                    ></span>
                  </a>
                </li>
              </div>
            </div>
          </div>
          <hr />
        </div>
        {this.state.isDisplay ? (
          <div className="column">
            <div className="profile-intro">
              <div className="box">
                <p className="title is-5" id="aboutTitle">About Me</p>
                <p
                  className="subtitle"
                  contentEditable={isOwner}
                  id="about"
                  onBlur={isOwner ? updateAbout : () => null}
                  spellCheck="false"
                >
                  {this.state.content}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  componentDidMount() {
    axios
      .get(`http://${window.location.hostname}:5000/profile/about`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length == 0) {
          this.setState({
            content: "Say something about yourself, try editing this text!",
          });
        } else {
          this.setState({
            content: res.data[0].content,
          });
        }
      });
  }
}
