import React from "react";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: "",
      name: "",
      saved: false,
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
      saved: false,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/v1/auth/updateurl",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          avatarUrl: this.state.avatarUrl,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
    } else {
      this.setState({ saved: true });
    }
  }

  render() {
    return (
      <section>
        <form>
          <h2>Settings</h2>
          {this.state.saved ? <h1>Saved</h1> : null}
          <label htmlFor="avatarUrl">Avatar URL</label>
          <input
            value={this.state.avatarUrl}
            onChange={this.handleChange}
            type="text"
            name="avatarUrl"
            placeholder="www.image.com/id/1"
          />

          <label htmlFor="name">Name</label>
          <input
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            placeholder="www.image.com/id/1"
          />

          <div className="form-actions">
            <button onClick={(e) => this.handleSubmit(e)}>
              Save&nbsp;
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default Settings;
