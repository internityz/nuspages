import React, { Component } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

function toggleModal() {
  document.getElementById("template-form").classList.toggle("is-active");
}

export default class TemplateModal extends Component {
  render() {
    return (
      <div className="modal" id="template-form">
        <div className="modal-background" onClick={toggleModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Portfolio Template</p>
            <button
              className="delete"
              aria-label="close"
              onClick={toggleModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <MarkdownPreview source={this.props.getSource()} />
          </section>
        </div>
      </div>
    );
  }
}
