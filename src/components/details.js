import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../App.css';

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

export default class Details extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Modal
          className="modal"
          open={this.props.movieDetail!==undefined}
          onClose={this.props.onClose}
          // closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          // timeout: 500,
        // }}
        >
          <Fade in={this.props.movieDetail!==undefined}>
            <div style={{display:'flex', flexDirection: 'row',}}>
              <div>
                <img alt={this.props.movie.title} src={this.props.movie.imageUrl} height="200"/>
              </div>
              <div>
                <h>{this.props.movie.title}</h>
                <p>{this.props.movieDetail}</p>
                <a href={`https://www.imdb.com/title/${this.props.movie.id}/`}> Show related movies </a>
                <div>
                  <a href={`https://en.wikipedia.org/?curid=${this.props.wikiPageId}/`}> Wikipedia </a>
                  <a href={`https://www.imdb.com/title/${this.props.movie.id}/`}> IMDb </a>
                </div>
              </div>
            </div>
          </Fade>
      </Modal>
  </div>
    )
  }
}