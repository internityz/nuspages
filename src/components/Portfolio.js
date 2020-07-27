import React, { Component } from "react";
import axios from "axios";
import TemplateModal from "./TemplateModal";

function preview() {
  window.location.href = "/preview";
}

function toggleTemplate() {
  document.getElementById("template-form").classList.toggle("is-active");
}

function template() {
  const t = `# Your Name
## Personal Profile
Write a paragraph about yourself, briefly stating your skills and education.

## Transferable Skills
- Skill 1
- Skill 2
- Skill 3

## Technical Skills
- Skill 1
- Skill 2
- Skill 3

## Education
#### Name of school
Include average CAP, graduation date and Honours classification.

## Work Experience
1. Internship 1
2. Work Experience 2
3. Work Experience 3

## Achievements
### Community Involvement
1. Involvement 1
2. Involvement 2
### Extracurricular Activities
1. Activity 1
2. Activity 2`;
  return t;
}

function save() {
  const md = document.getElementById("markdown").value;
  const b = document.getElementById("save");
  b.innerText = "Saving...";
  localStorage.setItem("md", md);

  axios({
    method: "PATCH",
    url: `http://${window.location.hostname}:5000/portfolio`,
    data: { md },
    withCredentials: true,
  }).then(() => (b.innerText = "Saved!"));
}

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: {},
    };
    this.getSource = this.getSource.bind(this);
  }

  getSource() {
    const source = this.state.portfolio.md;
    return source;
  }

  render() {
    return (
      <div className="portfolio-main">
        <div className="columns is-centered is-mobile ">
          <div className="column  is-10 is-11-mobile">
            <div className="columns ">
              <div className="column is-11 is-11-mobile">
                <div className="portfolio-header">
                  <div className="portfolio-title">
                    <p className="title is-3">Portfolio</p>
                  </div>
                  <div className="portfolio-help">
                    <a
                      className="button is-outlined is-inverted"
                      href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                      target="_blank"
                    >
                      <i className="fas fa-question"> Help</i>
                    </a>
                  </div>
                </div>
                <div className="control">
                  <textarea
                    className="textarea"
                    defaultValue={this.state.portfolio.md}
                    id="markdown"
                    placeholder={
                      this.state.placeholder || "Loading portfolio..."
                    }
                    rows="30"
                    spellCheck="false"
                    type="text"
                  ></textarea>
                </div>
              </div>
              <div className="column is-narrow">
                <div className="portfolio-menu">
                  <div className="menu-item">
                    <button
                      className="skewBtn purple"
                      onClick={preview}
                      target="_blank"
                    >
                      Preview
                    </button>
                  </div>
                  <TemplateModal getSource={template} />
                  <div className="menu-item">
                    <button className="skewBtn blue" onClick={toggleTemplate}>
                      Template
                    </button>
                  </div>
                  <div className="menu-item">
                    <button
                      className="skewBtn lorange"
                      id="save"
                      onClick={() => save(this.state.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(`http://${window.location.hostname}:5000/portfolio`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === null) {
          res.data = { md: "" };
        }
        localStorage.setItem("md", res.data.md);
        this.setState({
          placeholder: "Happy writing!",
          portfolio: res.data,
        });
      });
  }
}
