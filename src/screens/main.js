import React from 'react'
import axios from 'axios'
import Search from '../components/search'
import Results from '../components/results'
import Details from '../components/details'
import '../App.css';

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: undefined,
      selectedMovie: undefined,
      movieDetail: undefined,
      searchPosition: "beforeSearch",
    }
    this.imdbURL = "https://imdb8.p.rapidapi.com/title/find"
    this.imdbHeaders = {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "b3e24cc908mshe08416a73248e05p147bddjsn141b6a5f75c2"
    }
    this.proxy = "https://thingproxy.freeboard.io/fetch/"
    this.wikiSearchURL = "https://en.wikipedia.org/w/rest.php/v1/search/page"
    this.wikiExtractURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1"
  }

  getMoviesFromIMDB = title => {
    const config = {
      headers: this.imdbHeaders,
      params: {
        q: title
      }
    }

    axios.get(this.imdbURL, config)
      .then( response => {
        console.log(response)
        let moviesFromResponse = []
        for ( let result of response.data.results) {
          if (result.title !== undefined && result.title !== " ") {
            moviesFromResponse.push({
              title: result.title,
              imageUrl: result.image === undefined ? undefined : result.image.url,
              id: result.id.split("/")[2],
              type: result.titleType,
              year: result.year,
              runningTimeInMinutes: result.runningTimeInMinutes,
              actors: result.principals === undefined ? "--" : result.principals.map(actor => actor.name).toString()
            })
          }
        }
        this.setState({movies: moviesFromResponse}) 
      }).catch( error => console.log(error) )
  }

  getMovieWikipedia = movie => {
    const search = movie.title + movie.year + movie.actors
    const url = this.proxy + this.wikiSearchURL
    const config = {
        params: {
            q: search,
            limit: "1",
            format: "json"
        }
    }
    axios.get(url, config).then( resp => {
        const wikipediaPageId = resp.data.pages[0].id
        const url = this.proxy + this.wikiExtractURL
        const config = {
            params: {
                pageids: wikipediaPageId
                // titles: resp.data.pages[0].title,
            }
        }
        axios.get(url, config).then( resp => {
            // window.alert(Object.values(resp.data.query.pages)[0].extract)
            this.setState({
              movieDetail: Object.values(resp.data.query.pages)[0].extract,
              wikiPageId: wikipediaPageId
            }) 
        })
    } )
  }

  getRelated = movieId => {
    //https://imdb8.p.rapidapi.com/title/get-more-like-this
    //https://imdb8.p.rapidapi.com/title/get-details
  }

  handleSearch = title => {
    this.setState({searchPosition: "afterSearch",}) 
    this.getMoviesFromIMDB(title)    
  }

  openMovieDetails = event => {
    const movie = this.state.movies.find(movie => movie.id === event.target.id)
    this.setState({selectedMovie: movie})
    this.getMovieWikipedia(movie)
    // window.open(`https://www.imdb.com/title/${movie.target.id}`, "_blank")
  }

  closeMovieDetails = () => {
    this.setState({
      movieDetail: undefined,
      selectedMovie: undefined,
    })
  }

  render() {
    return (
      // <div className="bg">
        <div classname={this.state.searchPosition} >
            <Search onSearch={ title => this.handleSearch(title)}/>
            <Results data={this.state.movies} onItemPressed={this.openMovieDetails} />
            {this.state.movieDetail && 
            <Details 
              movie={this.state.selectedMovie}
              movieDetail={this.state.movieDetail} 
              wikiPageId={this.state.wikiPageId}
              onClose={this.closeMovieDetails}
            />}
        </div>
      // </div>
    );
  }

}
