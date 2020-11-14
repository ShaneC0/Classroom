import React from "react";

class ClassStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: {},
      students: [],
    };
  }

  async fetchClass() {
    const response = await fetch(
      `http://localhost:5000/api/v1/lesson/info/${this.props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      this.setState({ class: data.lesson });
    }
  }

  async fetchStudents() {
    const response = await fetch(
      `http://localhost:5000/api/v1/lesson/students/${this.props.match.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      this.setState({ students: data.students });
    }
  }

  async componentDidMount() {
    await this.fetchClass();
    await this.fetchStudents();
  }

  render() {
    return (
      <section>
        {this.state.class ? (
          <div>
            <h1>{this.state.class.name}</h1>
            <p>Period: {this.state.class.period}</p>
            <p>Join Code: {this.state.class.id}</p>
            <p>Students: </p>
            {this.state.students.length > 0
              ? this.state.students.map((student) => <p>{student.email}</p>)
              : null}
          </div>
        ) : (
          <h1>No classes to display</h1>
        )}
      </section>
    );
  }
}

export default ClassStream;
