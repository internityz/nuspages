import React, { Component } from "react";

export default class ThemeSlider extends Component {
  render() {
    return (
      <div className="theme-selector">
        <button
          data-hover={this.props.getTheme() ? "Light" : "Dark"}
          onClick={() => this.props.themeSelector()}
        >
          <div>Theme</div>
        </button>
      </div>
    );
  }
}
