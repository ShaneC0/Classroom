import React from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Classes from "./pages/Classes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };

    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.setUser()
  }

  setUser() {
    if(localStorage.token) {
      axios.get('http://localhost:5000/api/v1/', {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }).then(res => this.setState({user: res.data.user}))
    }
  }

  logOut() {
    delete localStorage.token
    this.setState({user: null})
  }

  render() {
    return (
      <Router>
        <Navbar loggedIn={this.state.user !== null ? true : false} logOut={this.logOut}/>
        <Switch>
          <Route path="/signup" render={props => <Signup {...props} setUser={this.setUser} />} />
          <Route path="/signin" render={props => <Signin {...props} setUser={this.setUser} />} />
          <Route path="/classes" render={props => <Classes {...props} user={this.state.user} />} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
