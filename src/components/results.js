import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Results extends React.Component {

  handlePress = event => {
    this.props.onItemPressed(event)
  }

  render() {
    if (this.props.data !== undefined) {
      return (
        <List>
          {this.props.data.map( movie =>
            <ListItem 
              button
              id={movie.id}
              data={movie}
              title={movie.l}
              actor={movie.s}
              key={movie.id}
              href={`https://www.imdb.com/title/${movie.id}`}
              onClick={this.handlePress}
            >
              {movie.i === undefined ?
                <img alt={movie.l} src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" height="200"/>
                :
                <img alt={movie.l} src={movie.i.imageUrl} height="200"/>
              }
              <ListItemText primary={movie.l} style={{paddingLeft:10}} />
              <ListItemText secondary={movie.q} />
              <ListItemText secondary={movie.s} />
              <ListItemText secondary={movie.y} />
            </ListItem>
          )}
        </List>
      )
    } else { 
      return null
    }
  }
}



