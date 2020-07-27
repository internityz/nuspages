import React, { Component } from "react";
import axios from "axios";

import Cards from "./Cards";
import Profile from "./Profile";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Profile
          session={this.state.session}
          username={this.props.match.params.username}
        />
        <Cards
          session={this.state.session}
          username={this.props.match.params.username}
          getTheme={this.props.getTheme}
        />
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(`http://${window.location.hostname}:5000/auth/check-session`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ session: res.data });
        }
      });
  }
}
