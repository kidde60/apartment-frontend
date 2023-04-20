import React, { Component } from "react";
import axios from "axios";
import Login from "./auth/login";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccessfulAuth(data) {
    
    this.props.handleLogin(data);
    // this.props.history.push('/dashboard');
  }

  handleLogoutClick() {
    axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(response => {
      this.props.handleLogout();
    }).catch(error => {
      console.log('logout error', error);
    })

    
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Login
          handleSuccessfulAuth={this.handleSuccessfulAuth}
        />
        <p>
          Don't have an account? <Link to="/registration">Register</Link>
        </p>
      </div>
    );
  }
}