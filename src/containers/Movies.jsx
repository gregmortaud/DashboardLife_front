import React, { Component } from "react";
import "./Movies.css";
import { createApolloFetch } from "apollo-fetch";
import Async from "async";
import config from "../config.js";

const API = config.api.uri;
const DEFAULT_QUERY = 'query PostForMovie { movie { name year link_download link_img synopsis} }';

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: [],
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
        return response;
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(result => this.setState({ movie: result.data.movie, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { movie, isLoading, error } = this.state;
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

     if (movie.length < 1) {
       return (
         <div className="alert alert-warning" role="alert">
           No movies available
         </div>
       );
     }

    var i = 0;
    var movieContainer = [];

    // movieContainer.push(
    //   <button type="button" class="btn btn-primary btn-lg">Refresh list</button>
    // );

    Async.whilst(
      function () { return movie[i] != null; },
      function (callLoop) {
        var name = null;
        var link_img = null;
        var synopsis = null;
        var link_download = null;
        movie[i] == null ? name = "loading.." : name = movie[i].name;
        movie[i] == null ? link_img = "loading.." : link_img = movie[i].link_img;
        movie[i] == null ? synopsis = "loading.." : synopsis = movie[i].synopsis;
        movie[i] == null ? link_download = "loading.." : link_download = movie[i].link_download;
        movieContainer.push(
            <div className="col-lg-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                      { name }
                    </div>
                    <div className="panel-body">
                        <img src={ link_img } />
                        <div className="movieContainer">
                          <p>
                            { synopsis }
                          </p>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <button type="button" className="btn btn-success">
                          <a href={ link_download } rel="nofollow" title={ name }>Download</a>
                      </button>
                      <button type="button" className="btn btn-primary">
                        Streaming
                    </button>
                      </div>
                </div>
            </div>
        );
        i ++;
        callLoop();
      },
      function (err) {
        console.log("Loaded");
        return ;
      }
    )
    return (movieContainer);
  }
}

export default Movies
