import React from "react";
import { Link } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      currentStep: 1,
      errors: [],
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
      errors: [],
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/v1/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      this.setState({ errors: [data.message] });
    } else {
      localStorage.token = data.token;
      await this.props.setUser();
      this.props.history.push("/classes");
    }
  }

  render() {
    return (
      <section>
        <form>
          <h2>Sign in</h2>
          {this.state.errors.length > 0 ? (
            <div className="error-group">
              {this.state.errors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          ) : null}
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
                <Link to="/signup">Create account</Link>
                <button
                  onClick={() =>
                    this.setState({ currentStep: this.state.currentStep + 1 })
                  }
                >
                  Next &nbsp;
                  <i className="fas fa-arrow-right"></i>
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
              <div className="form-actions">
                <button
                  onClick={() =>
                    this.setState({ currentStep: this.state.currentStep - 1 })
                  }
                >
                  Back
                </button>
                <button onClick={(e) => this.handleSubmit(e)}>
                  Next &nbsp;
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </>
          ) : null}
        </form>
      </section>
    );
  }
}

export default Signin;
