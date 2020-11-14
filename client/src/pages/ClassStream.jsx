import React from "react";

class ClassStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: {},
      students: [],
      assignments: []
    };
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

  async fetchAssignments() {
    const response = await fetch(
      `http://localhost:5000/api/v1/assignment/class/${this.props.match.params.id}`,
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
      this.setState({ assignments: data.assignments });
    }
  }

  async componentDidMount() {
    await this.fetchClass();
    await this.fetchStudents();
    await this.fetchAssignments();
  }

  render() {
    return (
      <div className="stream">
        {this.state.class ? (
          <>
            <div className="class-info">
              <h1>{this.state.class.name}</h1>
              <p>Period: {this.state.class.period}</p>
              <p>Join Code: {this.state.class.id}</p>
            </div>
            {this.state.students.length > 0 ? (
              <>
                <h1>Students: </h1>
                {this.state.students.map((student, i) => (
                  <p key={i}>{student.email}</p>
                ))}
              </>
            ) : (
              <h1>No students SHOULD BE IMPOSSIBLE</h1>
            )}
            {this.state.assignments.length > 0 ? (
              <>
                <h1>Assignments: </h1>
                {this.state.assignments.map((assignment, i) => (
                  <p key={i}>Assignment: {assignment.name} Points: {assignment.pointValue}</p>
                ))}
              </>
            ) : (
              <h1>No assignments</h1>
            )}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    );
  }
}

export default ClassStream;
