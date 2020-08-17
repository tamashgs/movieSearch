import React from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';


export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      data: ''
    }

    this.imdbURL = "https://imdb8.p.rapidapi.com/title/auto-complete"
    this.imdbHeaders = {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "b3e24cc908mshe08416a73248e05p147bddjsn141b6a5f75c2"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getMoviesFromIMDB = () => {
    const config = {
      headers: this.imdbHeaders,
      params: {
        q: this.state.value
      }
    }
    
    axios.get(this.imdbURL, config)
      .then((response)=>{
        this.setState({data: response.data})
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    // if ( this.state.value.length > 0 )
    //   this.getMoviesFromIMDB()
  }

  handleSubmit(event) {
    this.getMoviesFromIMDB()
    event.preventDefault();
  }

   List = (props) => {
    if ( props.data.d !== undefined) {
      const listItems = props.data.d.map( movie =>
        <ListItem button key={movie.id} href={`https://www.imdb.com/title/${movie.id}`}>
          {movie.i == undefined ?
            <img alt={movie.l} src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" height="200"/>
            :
            <img alt={movie.l} src={movie.i.imageUrl} height="200"/>
          }
            <ListItemText primary={movie.l} />
            <ListItemText secondary={movie.q} />
            <ListItemText secondary={movie.s} />
            <ListItemText secondary={movie.y} />
        </ListItem>
      )
      return (
        <List>{listItems}</List>
      )
    } else {
      return <a></a>
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" placeholder="Search for a title..."value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <this.List data={this.state.data}/>
      </div>
    );
  }

}
