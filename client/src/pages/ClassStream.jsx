import React from "react";

class ClassStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: {},
    };
  }

  render() {
    return <h1>Class stream for class id {this.props.match.params.id}</h1>;
  }
}

export default ClassStream;
