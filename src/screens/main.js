import React from "react";
import axios from "axios";
import Search from "../components/search";
import Results from "../components/results";
import Details from "../components/details";
import Progress from "../components/progress";
import { formatIMDBArrayResponse } from "../utils/utils";
import "./main.css";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: undefined,
      selectedMovie: undefined,
      movieDetail: undefined,
      searchPosition: "beforeSearch",
      loading: undefined,
    };
    this.imdbURL = "https://imdb8.p.rapidapi.com/title/";
    this.imdbHeaders = {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "0a1542a2ccmshee7f4f469fd3c2cp194438jsn7052bec27527",
      //"f02e6d7533msh44a1ffcc0652732p11824ajsn5460740c6b15",
      //"b3e24cc908mshe08416a73248e05p147bddjsn141b6a5f75c2"
    };
    this.proxy = "https://thingproxy.freeboard.io/fetch/";
    this.wikiSearchURL = "https://en.wikipedia.org/w/rest.php/v1/search/page";
    this.wikiExtractURL =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1";
    this.maxRelated = 4;
  }

  onDownloadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    this.setState({ loading: percentCompleted });
    if (percentCompleted === 100)
      setTimeout(() => this.setState({ loading: undefined }), 1000);
    this.setState({ loading: undefined });
  };

  getMoviesFromIMDB = (title) => {
    const config = {
      headers: this.imdbHeaders,
      params: {
        q: title,
      },
      onDownloadProgress: this.onDownloadProgress,
    };
    this.setState({ loading: 0 });
    axios
      .get(this.imdbURL + "find", config)
      .then((response) =>
        this.setState({
          movies: formatIMDBArrayResponse(response.data.results),
        })
      )
      .catch((error) => window.alert(error));
  };

  getMovieWikipedia = (movie) => {
    // Searching on wikipedia by:
    const search = movie.title + movie.year + movie.actors;
    const url = this.proxy + this.wikiSearchURL;
    const config = {
      params: {
        q: search,
        limit: "1",
        format: "json",
      },
      onDownloadProgress: this.onDownloadProgress,
    };
    this.setState({ loading: 0 });
    // Find the Wikipedia page id
    axios
      .get(url, config)
      .then((resp) => {
        if (resp.data.pages[0] !== undefined) {
          const wikipediaPageId = resp.data.pages[0].id;
          const url = this.proxy + this.wikiExtractURL;
          const config = {
            params: {
              pageids: wikipediaPageId,
            },
            onDownloadProgress: this.onDownloadProgress,
          };
          // Gets the wikipedia extract using page id
          axios
            .get(url, config)
            .then((resp) => {
              this.setState({
                movieDetail: Object.values(resp.data.query.pages)[0].extract,
                wikiPageId: wikipediaPageId,
              });
            })
            .catch((error) => window.alert(error));
        } else this.setState({ movieDetail: "Wikipedia Page Not Found" });
      })
      .catch((error) => window.alert(error));
  };

  getRelated = (movieId) => {
    // Searching by imdb movie id
    const config = {
      headers: this.imdbHeaders,
      params: {
        tconst: movieId,
      },
    };
    this.setState({ loading: 0 });
    // Gets related movies
    axios
      .get(this.imdbURL + "get-more-like-this", config)
      .then(async (response) => {
        let movieDetail = [];

        // Gets the details of 'maxRelated' piece of movies
        for (let i = 0; i < this.maxRelated; i++) {
          this.setState({ loading: (i / this.maxRelated) * 100 });
          config.params.tconst = response.data[i].split("/")[2];
          movieDetail.push(
            await axios.get(this.imdbURL + "get-details", config)
          );
        }

        const formatedRaletedMovied = formatIMDBArrayResponse(
          movieDetail.map((resp) => resp.data)
        );

        this.setState({ movies: formatedRaletedMovied, loading: undefined });
        this.handleCloseDetails();
      })
      .catch((error) => window.alert(error));
  };

  handleShowRelated = () => {
    this.getRelated(this.state.selectedMovie.id);
    this.handleCloseDetails();
  };

  handleSearch = (title) => {
    this.setState({ searchPosition: "afterSearch" });
    this.getMoviesFromIMDB(title);
  };

  handleItemPressed = (event) => {
    const movie = this.state.movies.find(
      (movie) => movie.id === event.currentTarget.id
    );
    this.setState({ selectedMovie: movie });
    this.getMovieWikipedia(movie);
  };

  handleCloseDetails = () => {
    this.setState({
      movieDetail: undefined,
      selectedMovie: undefined,
    });
  };

  render() {
    return (
      <div className="bg">
        {this.state.loading !== undefined && (
          <Progress progress={this.state.loading} />
        )}
        <Search
          onSearch={(title) => this.handleSearch(title)}
          style={this.state.searchPosition}
        />
        <Results
          data={this.state.movies}
          onItemPressed={this.handleItemPressed}
        />
        {this.state.movieDetail && (
          <Details
            movie={this.state.selectedMovie}
            movieDetail={this.state.movieDetail}
            wikiPageId={this.state.wikiPageId}
            onClose={this.handleCloseDetails}
            onShowRelated={this.handleShowRelated}
          />
        )}
      </div>
    );
  }
}
