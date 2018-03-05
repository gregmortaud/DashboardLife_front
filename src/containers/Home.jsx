import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import "./Home.css";
import { createApolloFetch } from "apollo-fetch";
import config from "../config.js";

const API = config.api.uri;
const DEFAULT_QUERY = 'query PostForStat { general_stat { newMovies newTravels } }';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      general_stat: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const fetch = createApolloFetch({
      uri: API,
    });
    fetch({ query: DEFAULT_QUERY })
    .then(response => {
      if (response.data) {
        console.log(response);
        return response;
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(result => this.setState({ general_stat: result.data.general_stat, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Greg's list</h1>
        <p>By Greg for Greg's friend</p>
      </div>
    );
  }

  renderHome() {
    const { general_stat, isLoading, error } = this.state;

    if (error) {
      return (
        <div className="alert alert-danger">
            {error.message}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="container">
          <button className="btn btn-sm btn-warning">
            <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
            </span> Loading...
          </button>
        </div>
      );
     }

     var newMovies = null;
     general_stat[0] == null ? newMovies = "loading.." : newMovies = general_stat[0].newMovies;
    return (
      <div>
        <PageHeader>Welcome Gregoire</PageHeader>
          <div className="row">
              <div className="col-lg-3 col-md-6">
                  <div className="panel panel-primary">
                      <div className="panel-heading">
                          <div className="row">
                              <div className="col-xs-3">
                                  <i className="fa fa-film fa-4x"></i>
                              </div>
                              <div className="col-xs-9 text-right">
                                  <div className="huge">{ newMovies }</div>
                                  <div>New Movies!</div>
                              </div>
                          </div>
                      </div>
                      <a className="link_movies" href="/movies">
                          <div className="panel-footer">
                              <span className="pull-left">View Movies</span>
                              <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                              <div className="clearfix"></div>
                          </div>
                      </a>
                  </div>
              </div>
            </div>
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
