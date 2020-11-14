import React from "react";
import {Link} from "react-router-dom"

class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      period: "",
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
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    //validate class before

    const response = await fetch("http://localhost:5000/api/v1/lesson/create", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        period: this.state.period,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      this.props.history.push("/classes");
    }
  }

  render() {
    return (
      <section>
        <form>
          <h2>Create Class</h2>

          <input
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            placeholder="Class name"
          />

          <input
            value={this.state.period}
            onChange={this.handleChange}
            name="period"
            type="text"
            placeholder="Period"
          />

          <div className="form-actions">
          <Link to="/classes">Back to classes</Link>
            <button onClick={(e) => this.handleSubmit(e)}>Next &nbsp;
                  <i className="fas fa-arrow-right"></i></button>
          </div>
        </form>
      </section>
    );
  }
}

export default CreateClass;
