import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import About from "./components/About";
import Editor from "./components/Editor";
import Home from "./components/Home";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Preview from "./components/Preview";
import Portfolio from "./components/Portfolio";
import SearchResults from "./components/SearchResults";
import User from "./components/User";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.themeSelector = this.themeSelector.bind(this);
    this.getTheme = this.getTheme.bind(this);
  }

  componentWillMount() {
    axios
      .get(`http://${window.location.hostname}:5000/profile/`, {
        withCredentials: true,
      })
      .then((res) => {
        //true - dark, false - light
        const { theme } = res.data[0];
        this.setState({
          theme: theme,
        });
      });
  }

  themeSelector = () => {
    const theme = !this.state.theme;
    axios.patch(
      `http://${window.location.hostname}:5000/profile/`,
      {
        theme: theme,
      },
      { withCredentials: true }
    );
    this.setState({ theme: theme });
  };
  getTheme = () => {
    return this.state.theme;
  };
  render() {
    const theme = this.state.theme;
    return (
      <BrowserRouter>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css"
          />
          <link
            rel="stylesheet"
            href={theme ? "/style-light.css" : "/style-dark.css"}
          />
        </Helmet>
        <LoginModal />
        {window.location.pathname !== "/preview" ? (
          <Navbar themeSelector={this.themeSelector} getTheme={this.getTheme} />
        ) : null}
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/editor" component={Editor} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/preview" component={Preview} />
            <Route path="/search" component={SearchResults} />
            <Route
              path="/user/:username"
              render={(props) => <User {...props} getTheme={this.getTheme} />}
            />
            <Route path="/404" component={NotFound} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
