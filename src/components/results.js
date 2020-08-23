import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './components.css'

export default class Results extends React.Component {

  render() {
    if (this.props.data !== undefined) {
      return (
        <Box
          display="flex"
          flexWrap="wrap"
          p={1}
          m={1}
          justifyContent="center"
          style={{padding: 30}}
        >
          {this.props.data.map( movie => 
            <Box 
              id={movie.id}
              key={movie.id}
              onClick={this.props.onItemPressed}
              className="filmItemBox"
            > 
              <img 
                alt={movie.title} src={movie.imageUrl === undefined ? require("../images/notFound.png") : movie.imageUrl} 
                width="180"
              />
              <Typography style={{fontSize: 28, paddingTop: 10, maxWidth: 200}}>
                {movie.title}
              </Typography >
              <Typography style={{fontSize: 18, padding: 10,  maxWidth: 200}}>
                { movie.year +  " - " +
                  movie.type +  " - " +
                  Math.floor(movie.min/60) + "h " +Math.round(((movie.min / 60)-Math.floor(movie.min/60))*60*100)/100+"m"}
              </Typography >
              <Typography style={{fontFamily: 'Poppins', fontSize: 15, paddingBottom: 5,  maxWidth: 200}}>
                {movie.actors}
              </Typography >
            </Box>
          )}
        </Box>
      )
    } else { 
      return null
    }
  }
}



