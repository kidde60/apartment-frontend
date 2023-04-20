import React, { Component } from "react";
import axios from "axios";


export default class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        password_confirmation: "",
        registrationErrors: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleSubmit(event) {
    
      const {
        email,
        password,
       
      } = this.state;
      axios
        .post(
          "http://localhost:3000/sessions",
          {
            user: {
              email: email,
              password: password
              
            }
          },
          { withCredentials: true }
        )
        .then(response => {
          if (response.data.logged_in === true) {
            console.log("Registration data", response.data)
            this.props.handleSuccessfulAuth(response.data);
          }
        })
        .catch(error => {
          console.log("registration error", error);
        });
  
      event.preventDefault();
       
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={this.handleChange}
                
              />
            </div>
  
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
  
          
  
            <button type="submit" className="btn btn-primary btn-sm">
              Login
            </button>
            
          </form>
        </div>
      );
    }
  }