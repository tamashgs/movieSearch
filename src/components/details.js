import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import '../App.css';

import Backdrop from '@material-ui/core/Backdrop';

// import Backdrop from '@material-ui/core/Backdrop';
// import { makeStyles } from '@material-ui/core/styles';
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
  // constructor(props) {
  //   super(props)
  // }

  setImage = imageUrl => 
    this.props.movie.imageUrl === undefined ? "../images/not_found.jpg" : imageUrl

  render() {
    return (
      <div>
        <Modal
          className="modal"
          open={this.props.movieDetail!==undefined}
          onClose={this.props.onClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
        }}
        >
          <Fade in={this.props.movieDetail!==undefined}>
            <Box style={{display:'flex', flexDirection: 'row', flexWrap: "wrap"}}>
              <Box style={{padding: 10, alignItems: 'stretch', justifyContent:'center', height: '80%', width: '35%'}}> 
                  <img alt={this.props.movie.title} src={this.setImage(this.props.movie.imageUrl)} height="50%"/>
              </Box>
              <Box style={{padding: 10, alignItems: 'center', height: '80%', width: '60%'}}>
                <h1>{this.props.movie.title}</h1>
                <p>{this.props.movieDetail}</p>
                <Button onClick={this.props.onShowRelated}> Show related movies </Button>
                <div>
                  <Link
                    href={`https://en.wikipedia.org/?curid=${this.props.wikiPageId}/`}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="body2"
                  >
                    Wikipedia
                  </Link>
                  <Link
                    href={`https://www.imdb.com/title/${this.props.movie.id}/`}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="body2"
                  >
                    IMDb
                  </Link>
                </div>
              </Box>
            </Box>
          </Fade>
      </Modal>
  </div>
    )
  }
}