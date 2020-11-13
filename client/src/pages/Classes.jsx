import React from "react";

import Classcard from "../components/Classcard";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      loading: true,
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
      this.setState({ classes: data.lessons, loading: false });
    }
  }

  render() {
    return (
      <div className="card-container">
        {this.state.loading ? (
          <h2>LOADING</h2>
        ) : (
          this.state.classes.map((classObj, i) => (
            <Classcard key={i} class={classObj} />
          ))
        )}
      </div>
    );
  }
}

export default Classes;
