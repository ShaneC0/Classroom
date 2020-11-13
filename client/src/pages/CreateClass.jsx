import React from "react";

class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      period: 1,
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

    const response = await fetch("http://localhost:5000/api/v1/lesson/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        name: this.state.name,
        period: parseInt(this.state.period),
      }),
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
            type="number"
            name="period"
          />

          <div className="form-actions">
            <button onClick={(e) => this.handleSubmit(e)}>Next</button>
          </div>
        </form>
      </section>
    );
  }
}

export default CreateClass;
