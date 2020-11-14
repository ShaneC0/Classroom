import React from "react";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      users: [],
    };
  }

  async fetchClasses() {
    const response = await fetch("http://localhost:5000/api/v1/lesson/list", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      this.setState({ classes: data.lessons });
      console.log(this.state);
    }
  }

  async fetchUsers() {
    const response = await fetch("http://localhost:5000/api/v1/auth/all");

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      this.setState({ users: data.users });
    }
  }

  async componentDidMount() {
    await this.fetchClasses();
    await this.fetchUsers();
  }

  render() {
    return (
      <div style={{'display': 'flex', 'flex-direction': 'column', 'alignItems': 'center', 'justifyContent': 'center', 'height': '93vh'}}>
        <h1>Users: </h1>
        {this.state.users.length > 0 ? <div>{this.state.users.map(user => <p>{user.email}</p>)}</div> : <p>No users loaded</p>}
        <h1>Classes: </h1>
        {this.state.classes.length > 0 ? <div>{this.state.classes.map(classObj => <p>{classObj.name}</p>)}</div> : <p>No classes loaded</p>}
      </div>
    );
  }
}

export default Admin;
