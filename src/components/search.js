import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './components.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      disableSubmit: true
    }
  }

  handleChange = event => {
    if ( this.state.value.length > 0 )
      this.setState({value: event.target.value, disableSubmit: false})
    else 
      this.setState({value: event.target.value, disableSubmit: true})
  }

  handleSubmit = event => {
    event.preventDefault();
    if ( this.state.value.length > 0 )
      this.props.onSearch(this.state.value)
  }

  render() {
    return (
      <form 
        noValidate 
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className={this.props.style}
      >
        <TextField 
          id="search" 
          label="Search for a title..." 
          placeholder="Enter a movie title"
          value={this.state.value}
          onChange={this.handleChange}
          style={{
            border: "white",
            color: "white"
          }}
          InputProps={{
            style: {
                color: "white",
            }
          }}
          InputLabelProps={{
            style: {
              color: "white"
            }
          }}
        />
        <Button 
          disabled={this.state.canSubmit} 
          type="submit"
          className="buttonSearch"
          style={{height: 50, color: 'white'}}
        >
          Search
        </Button>
      </form>
    )
  }
}
