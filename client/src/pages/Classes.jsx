import React from "react";

class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


 

  render() {
    return (
      <section>
        {this.props.user ? 
        <h1>Hello, {this.props.user.email}.</h1> : <h1>NOT LOGGED IN!</h1>}
      </section>
    );
  }
}

export default Classes;
