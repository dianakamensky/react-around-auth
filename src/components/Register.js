import React, { Button } from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
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

  render() {
    return (
      <div className="logister">
        <h1 className="logister__title">Sign Up</h1>
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
            Sign up
          </button>
        </div>
        <div className="logister__login">
          <p>Already a member?</p>
          <Link to="login" className="logister__login-link">
            Log in here!
          </Link>
        </div>
      </div>
    );
  }
}

export default Register;
