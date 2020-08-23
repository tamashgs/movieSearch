import React from 'react'
import axios from 'axios'
import Search from '../components/search'
import Results from '../components/results'
import Details from '../components/details'
import Progress from '../components/progress'
import './main.css';

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: undefined,
      selectedMovie: {id: "1", actors: "Cillian Murphy, Jozsika", min: 110, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
      movieDetail: "fain",
      searchPosition: "beforeSearch",
      loading: undefined
    }
    this.imdbURL = "https://imdb8.p.rapidapi.com/title/"
    this.imdbHeaders = {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "f02e6d7533msh44a1ffcc0652732p11824ajsn5460740c6b15"
      //"b3e24cc908mshe08416a73248e05p147bddjsn141b6a5f75c2"
    }
    this.proxy = "https://thingproxy.freeboard.io/fetch/"
    this.wikiSearchURL = "https://en.wikipedia.org/w/rest.php/v1/search/page"
    this.wikiExtractURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1"
  }

  onDownloadProgress = progressEvent => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    this.setState({loading: percentCompleted})
    if ( percentCompleted === 100 ) 
      setTimeout(() => this.setState({loading: undefined}), 1000)
    this.setState({loading: undefined})
  }

  formatIMDBArrayResponse = response => {
    let moviesFromResponse = []
    for ( let result of response) {
      if (result.title !== undefined && result.title !== " ") {
        moviesFromResponse.push({
          title: result.title,
          imageUrl: result.image === undefined ? undefined : result.image.url,
          id: result.id.split("/")[2],
          type: result.titleType,
          year: result.year,
          min: result.runningTimeInMinutes,
          actors: result.principals === undefined ? "--" : result.principals.map(actor => actor.name).toString()
        })
      }
    }
    return moviesFromResponse
  }

  formatIMDBResponse = response => {
    let moviesFromResponse = []
    return moviesFromResponse
  }

  getMoviesFromIMDB = title => {
    // this.setState({movies: [
    //   {id: "1", actors: "Cillian Murphy, Jozsika", min: 110, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
    //   {id: "1", actors: "Cillian Murphy, Jozsika",min: 120, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
    //   {id: "1", actors: "Cillian Murphy, Jozsika",min: 120, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
    //   {id: "1", actors: "Cillian Murphy, Jozsika",min: 120, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
    //   {id: "1", actors: "Cillian Murphy, Jozsika",min: 120, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
    //   {id: "1", actors: "Cillian Murphy, Jozsika",min: 120, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
    //   {id: "1", actors: "Cillian Murphy, Jozsika",min: 120, title:'Peaky Blinders', id: 'tt3566726', year: 2013, type: 'Cillian', imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDEzNTYyN15BMl5BanBnXkFtZTgwMjQyMzg1NzM@._V1_UY268_CR16,0,182,268_AL_.jpg '},
    // ]})
    const config = {
      headers: this.imdbHeaders,
      params: {
        q: title
      },
      onDownloadProgress: this.onDownloadProgress
    }
    this.setState({loading: 0})
    axios.get(this.imdbURL + "find", config)
      .then( response => this.setState({movies: this.formatIMDBArrayResponse(response.data.results)}) )
      .catch( error => {
        this.setState({movies: [{title:'Peaky Blinders', id: 'tt3566726', year: 2013, actors: 'Cillian'}]})
        window.alert(error)
        console.log(error) 
      })
  }

  getMovieWikipedia = movie => {
    const search = movie.title + movie.year + movie.actors
    const url = this.proxy + this.wikiSearchURL
    const config = {
      params: {
        q: search,
        limit: "1",
        format: "json"
      },
      onDownloadProgress: this.onDownloadProgress
    }
    this.setState({loading: 0})
    axios.get(url, config)
      .then( resp => {
        if (resp.data.pages[0] !== undefined) {
          const wikipediaPageId = resp.data.pages[0].id
          const url = this.proxy + this.wikiExtractURL
          const config = {
              params: {
                  pageids: wikipediaPageId
              }
          }
          axios.get(url, config)
            .then( resp => {
              this.setState({
                movieDetail: Object.values(resp.data.query.pages)[0].extract,
                wikiPageId: wikipediaPageId
              })
            })
            .catch( error => console.log(error))
        } else this.setState({movieDetail: "Wikipedia Page Not Found" }) 
      })
      .catch( error => console.log(error))
  }

  //https://imdb8.p.rapidapi.com/title/get-more-like-this
  //https://imdb8.p.rapidapi.com/title/get-details
  getRelated = movieId => {
    const config = {
      headers: this.imdbHeaders,
      params: {
        tconst: movieId
      },
      onDownloadProgress: this.onDownloadProgress
    }
    this.setState({loading: 0})
    axios.get(this.imdbURL + "get-more-like-this", config)
    .then(async response => {
      let movieDetail = []
      
      for (let i = 0; i < 3; i++) {
        config.params.tconst = response.data[i].split("/")[2]
        movieDetail.push(await axios.get(this.imdbURL + "get-details", config))
      }
      
      const formatedRaletedMovied = this.formatIMDBArrayResponse(movieDetail.map(resp => resp.data))
      this.setState({movies: formatedRaletedMovied})
      this.closeMovieDetails()
      
    })
    .catch( error => console.log(error))
  }

  handleShowRelated = () => {
    this.getRelated(this.state.selectedMovie.id)
    this.handleCloseDetails()
  }

  handleSearch = title => {
    this.setState({searchPosition: "afterSearch"}) 
    this.getMoviesFromIMDB(title)    
  }

  handleItemPressed = event => {
    const movie = this.state.movies.find(movie => movie.id === event.currentTarget.id)
    this.setState({selectedMovie: movie})
    this.getMovieWikipedia(movie)
  }

  handleCloseDetails = () => {
    this.setState({
      movieDetail: undefined,
      selectedMovie: undefined,
    })
  }

  render() {
    return (
      <div className="bg">
        <div>
            {this.state.loading !== undefined && <Progress progress={this.state.loading} />}
            <Search onSearch={title => this.handleSearch(title)} style={this.state.searchPosition}/>
            <Results data={this.state.movies} onItemPressed={this.handleItemPressed} />
            {this.state.movieDetail && 
            <Details 
              movie={this.state.selectedMovie}
              movieDetail={this.state.movieDetail} 
              wikiPageId={this.state.wikiPageId}
              onClose={this.handleCloseDetails}
              onShowRelated={this.handleShowRelated}
            />}
        </div>
      </div>
    );
  }

}
