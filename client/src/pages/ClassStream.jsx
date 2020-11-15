import React from "react";
import AssignmentCard from "../components/AssignmentCard";

class ClassStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: {},
      students: [],
      assignments: [],
      currentPost: "",
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/v1/assignment/create",
      {
        method: "POST",
        body: JSON.stringify({
          name: this.state.currentPost,
          lessonId: this.state.class.id,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      this.setState((state, _) => ({
        assignments: [data.assignment, ...state.assignments],
        currentPost: "",
      }));
    }
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
            <form>
              <input
                value={this.state.currentPost}
                type="text"
                placeholder="Say something to the class"
                name="currentPost"
                onChange={this.handleChange}
              />
              <button onClick={(e) => this.handleSubmit(e)}>Post</button>
            </form>
            {this.state.assignments.length > 0 ? (
              <>
                {this.state.assignments.map((assignment, i) => (
                  <AssignmentCard key={i} assignment={assignment} />
                ))}
              </>
            ) : (
              <h1>No assignments</h1>
            )}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default ClassStream;
