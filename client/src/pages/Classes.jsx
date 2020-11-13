import React from "react";

import Classcard from "../components/Classcard";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:5000/api/v1/lesson/all", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data && data.message);
    } else {
      this.setState({ classes: data.lessons });
    }
  }

  render() {
    return (
      <div className="card-container">
        {this.state.classes.length > 0 ? (
          this.state.classes.map((classObj, i) => (
            <Classcard key={i} class={classObj} />
          ))
        ) : (
          <h2>No classes to display. TODO: Create new class</h2>
        )}
      </div>
    );
  }
}

export default Classes;
