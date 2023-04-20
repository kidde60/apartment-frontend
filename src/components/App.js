import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./auth/Registration";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    };
   
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(response => {
        // console.log('logged?', response)
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (
          !response.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
        <Routes>
        <Route exact path={"/"} element={<Home 
        {...this.props}
        loggedInStatus={this.state.loggedInStatus}
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        />} />
        <Route path="/dashboard" element={<Dashboard 
        {...this.props}
        loggedInStatus={this.state.loggedInStatus}
        />} />
        <Route path="/registration" element={<Registration 
         handleSuccessfulAuth={this.handleSuccessfulAuth}
         {...this.props}
         loggedInStatus={this.state.loggedInStatus}
        />} />
            {/* <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                />
              )}
            /> */}
{/*             
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            /> */}
            {/* <Route
              exact
              path={"/registration"}
              render={props => (
                <Registration
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            /> */}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}