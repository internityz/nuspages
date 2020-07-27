import React, { Component } from "react";

const qs = require("querystring");

export default class SearchResults extends Component {
  render() {
    const { username } = qs.parse(this.props.location.search.slice(1));
    return <p>You are searching for {username}</p>;
  }
}
