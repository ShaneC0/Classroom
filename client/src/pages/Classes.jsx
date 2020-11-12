import React from "react";
import * as axios from "axios";

import Classcard from "../components/Classcard";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/class/all", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((res) => {
        if (res.data.classes) {
          this.setState({ classes: res.data.classes });
        }
      });
  }

  render() {
    return (
      <section>
        {this.state.classes.length > 0 ? (
          <>
            <Classcard class={this.state.classes[0]} />
            <Classcard class={this.state.classes[1]} />
            <Classcard class={this.state.classes[2]} />
          </>
        ) : null}
      </section>
    );
  }
}

export default Classes;
