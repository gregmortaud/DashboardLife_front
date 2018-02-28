import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  // renderNotesList(notes) {
  //   return null;
  // }

  renderLander() {
    return (
      <div className="lander">
        <h1>Greg's list</h1>
        <p>By Greg for Greg</p>
      </div>
    );
  }

  renderHome() {
    return (
      <div className="notes">
        <PageHeader>Welcome Gregoire</PageHeader>
        <ListGroup>
          // {!this.state.isLoading && this.renderHomeList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderHome() : this.renderLander()}
      </div>
    );
  }
}

export default Home
