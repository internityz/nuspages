import React, { Component } from "react";
import axios from "axios";

const qs = require("querystring");

function highlightFields() {
  const t = document.getElementById("title");
  const c = document.getElementById("content");
  if (!t.value) t.style.border = "1.5px solid red";
  if (!c.value) c.style.border = "1.5px solid red";
}

function convertFile(file) {
  if (!file) {
    return false;
  } else {
    const r = new FileReader();
    return new Promise((res, rej) => {
      r.onload = () => res(r.result);
      r.readAsDataURL(file);
    });
  }
}

async function submitForm(method, url, img) {
  const b = document.getElementById("submit-btn");
  const f = (e) => document.getElementById(e).value;
  const i = document.getElementById("image").files[0];

  const data = {
    content: f("content"),
    footer: f("footer"),
    image: await convertFile(i) || img || "",
    title: f("title"),
  };

  if (!data.title || !data.content) return highlightFields();

  b.innerText = "Submitting...";
  axios({ data, method, url, withCredentials: true })
    .then((res) => {
      window.location.href = `http://${window.location.hostname}:3000/user/${res.data}`;
    })
}

function updateFile(e) {
  const s = document.getElementById("file-name");
  s.innerText = e.target.files[0].name;
}

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = qs.parse(props.location.search.slice(1));
    if (this.state.id) {
      this.state.url = `http://${window.location.hostname}:5000/cards/${this.state.id}`;
      this.state.method = "PATCH";
    } else {
      this.state.url = `http://${window.location.hostname}:5000/cards/create`;
      this.state.method = "POST";
    }
  }

  render() {
    return (
      <div className="editor-form">
        <label className="label">Title:</label>
        <div className="field">
          <div className="control">
            <textarea
              className="textarea is-medium"
              defaultValue={this.state.title}
              id="title"
              placeholder="Title*"
              rows="1"
              spellCheck="false"
              type="text"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Content:</label>
          <div className="control">
            <textarea
              className="textarea is-medium"
              defaultValue={this.state.content}
              id="content"
              placeholder="Content*"
              rows="15"
              spellCheck="false"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image: </label>
          <div className="control">
            <div className="file has-name is-right is-fullwidth">
              <label className="file-label">
                <input
                  className="file-input"
                  name="image"
                  id="image"
                  onChange={(e) => updateFile(e)}
                  type="file"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="far fa-image" />
                  </span>
                  <span className="file-label">
                    Select image
                  </span>
                </span>
                <span className="file-name" id="file-name">
                  No image selected
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Footer: </label>
          <div className="control">
            <textarea
              className="textarea is-medium"
              defaultValue={this.state.footer}
              id="footer"
              placeholder="Footer"
              rows="3"
              spellCheck="false"
            />
          </div>
        </div>
        <div className="field">
          <button
            className="button is-success"
            id="submit-btn"
            onClick={
              () => submitForm(this.state.method, this.state.url, this.state.image)
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.state.id) {
      axios
        .get(`http://${window.location.hostname}:5000/cards/${this.state.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            ...this.state,
            ...res.data,
          });
        });
    }
  }
}
