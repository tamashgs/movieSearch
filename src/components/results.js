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
              <ListItemText primary={movie.title} style={{paddingLeft:10}} />
              <ListItemText secondary={movie.type} />
              <ListItemText secondary={movie.actors} />
              <ListItemText secondary={movie.year} />
            </ListItem>
          )}
        </List>
      )
    } else { 
      return null
    }
  }
}



