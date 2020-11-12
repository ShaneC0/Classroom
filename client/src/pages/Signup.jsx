import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      currentStep: 1,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/v1/auth/signup", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200 && response.data.token) {
          localStorage.token = response.data.token;
          this.props.setUser();
          this.props.history.push("/classes");
        }
      }).catch(error => {
        this.setState({error: error.message})
      });
  }

  render() {
    return (
      <section>
        <form>
          <h2>Sign up</h2>
          {this.state.error}
          {this.state.currentStep === 1 ? (
            <>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="text"
                name="email"
                placeholder="Email"
              />

              <div className="form-actions">
                <Link to="/signin">Sign in</Link>
                <button
                  onClick={() =>
                    this.setState({ currentStep: this.state.currentStep + 1 })
                  }
                >
                  Next
                </button>
              </div>
            </>
          ) : null}

          {this.state.currentStep === 2 ? (
            <>
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
              <input
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />

              <div className="form-actions">
                <button
                  onClick={() =>
                    this.setState({ currentStep: this.state.currentStep - 1 })
                  }
                >
                  Back
                </button>
                <button onClick={(e) => this.handleSubmit(e)}>Next</button>
              </div>
            </>
          ) : null}
        </form>
      </section>
    );
  }
}

export default Signup;
