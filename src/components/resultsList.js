import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { flexbox } from '@material-ui/system';

export default class Results extends React.Component {

  handlePress = event => {
    this.props.onItemPressed(event)
  }

  render() {
    if (this.props.data !== undefined) {
      return (
        <div>
          <Box
            display="flex"
            flexWrap="wrap"
            p={1}
            m={1}
            justifyContent="center"
            style={{padding: 30}}
          >
          {this.props.data.map( movie => 
            <Box style={{
                padding: 10, 
                margin: 10, 
                position: 'relative', 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                color:"white",
                cursor: 'pointer',
              }}
            >
              {movie.imageUrl === undefined ?
                <img alt={movie.title} src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" width="180"/>
                :
                <img alt={movie.title} src={movie.imageUrl} width="180"/>
              }
              <p style={{fontSize: 25}}>
                {movie.title}
              </p>
              <p style={{fontSize: 20}}>
                { movie.year +  " - " +
                  movie.type +  " - " +
                  Math.floor(movie.min/60) + "h " +Math.round(((movie.min / 60)-Math.floor(movie.min/60))*60*100)/100+"m"}
              </p>
              <p style={{fontFamily: 'Poppins', fontSize: 15}}>
                {movie.actors}
              </p>
            </Box>
          )}
          </Box>
        </div>

        
        /* <List>
          {this.props.data.map( movie =>
            <ListItem 
              button
              id={movie.id}
              data={movie}
              title={movie.title}
              actor={movie.actors}
              key={movie.id}
              href={`https://www.imdb.com/title/${movie.id}`}
              onClick={this.handlePress}
            >
              {movie.imageUrl === undefined ?
                <img alt={movie.title} src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" height="200"/>
                :
                <img alt={movie.title} src={movie.imageUrl} height="200"/>
              }
              <ListItemText
                style={{paddingLeft:10}}
                primary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>{movie.title}</Typography>}
              /> 
              <ListItemText
                secondary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>{movie.type}</Typography>}
              /> 
              <ListItemText
                secondary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>{movie.actors}</Typography>}
              /> 
              <ListItemText
                secondary={<Typography variant="h6" style={{ color: '#FFFFFF' }}>{movie.year}</Typography>}
              /> 
            </ListItem>
          )}
        </List> */
      )
    } else { 
      return null
    }
  }
}



