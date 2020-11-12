import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      currentStep: 1,
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

  handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:5000/api/v1/auth/signin', {
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      if(response.status === 200) {
        localStorage.token = response.data.token;
      }
    })

  }

  render() {
    return (
      <section>
        <form>
          <h2>Sign in</h2>
          {this.state.currentStep === 1 ? (
            <>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="text"
                name="email"
                placeholder="Email"
              />

              <Link to="/signup">Create account</Link>
              <button
                onClick={() =>
                  this.setState({ currentStep: this.state.currentStep + 1 })
                }
              >
                Next
              </button>
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

              <button
                onClick={() =>
                  this.setState({ currentStep: this.state.currentStep - 1 })
                }
              >
                Back
              </button>
              <Link to="/signup">Create account</Link>
              <button onClick={(e) => this.handleSubmit(e)}>Next</button>
            </>
          ) : null}
        </form>
      </section>
    );
  }
}

export default Signin;
