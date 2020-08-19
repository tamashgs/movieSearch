import React from 'react'
import axios from 'axios'
import Search from '../components/search'
import Results from '../components/results'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: undefined
    }
    this.imdbURL = "https://imdb8.p.rapidapi.com/title/auto-complete"
    this.imdbHeaders = {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "b3e24cc908mshe08416a73248e05p147bddjsn141b6a5f75c2"
    }
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
          this.setState({movies: response.data.d}) 
        })
      .catch( error => console.log(error) )
  }

  handleSearch = title => {
    this.getMoviesFromIMDB(title)    
  }

  // AIzaSyDztMUwN_t7Hu_-NT5ecqMxdqsslZ4zhtc

  openMovieDetails = event => {
    const movie = this.state.movies.find(movie => movie.id === event.target.id)
    const search = movie.l //+ " " + movie.s // + " " + movie.y
    const url = "https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/w/rest.php/v1/search/page"
    const config = {
        params: {
            q: search,
            limit: "2",
            format: "json"
        }
    }
    axios.get(url, config).then( resp => {
        const wikipediaPageId = resp.data.pages[0].id
        const url = "https://thingproxy.freeboard.io/fetch/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1"
        const config = {
            params: {
                pageids: wikipediaPageId
                // titles: resp.data.pages[0].title,
            }
        }
        axios.get(url, config).then( resp => {
            window.alert(Object.values(resp.data.query.pages)[0].extract)
            console.log(Object.values(resp.data.query.pages)[0].extract) 
        })
    } )
    // window.open(`https://www.imdb.com/title/${movie.target.id}`, "_blank")
    // https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=The%20Wolf%20of%20Wall%20Street
  }

  render() {
    return (
      <div>
        <Search onSearch={ title => this.handleSearch(title)}/>
        <Results data={this.state.movies} onItemPressed={this.openMovieDetails} />
      </div>
    );
  }

}
