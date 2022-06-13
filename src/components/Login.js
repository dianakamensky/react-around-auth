import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    auth
      .authorize(this.state.email, this.state.password)
      .then((data) => {
        if (data.jwt) {
          this.setState(
            {
              email: "",
              password: "",
            },
            () => {
              this.props.handleLogin();
              this.props.history.push("/");
            }
          );
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="logister">
        <h1 className="logister__title">Log In</h1>
        <form className="logister__form">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </form>
        <div className="logister__button-container">
          <button onClick={this.handleSubmit} className="logister__link">
            Log In
          </button>
        </div>
        <div className="logister__signup">
          <p>Not a member yet?</p>
          <Link to="register" className="logister__register-link">
            Sign up here!
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
