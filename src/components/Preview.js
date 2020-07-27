import React, { Component } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default class Preview extends Component {
  render() {
    return (
      <MarkdownPreview source={localStorage.getItem("md")} />
    );
  }

  componentDidMount() {
    window.print();
  }
}
