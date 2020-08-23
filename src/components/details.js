import React from "react";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Backdrop from "@material-ui/core/Backdrop";
import "./components.css";

export default class Details extends React.Component {
  render() {
    return (
      <Modal
        className="modal"
        open={this.props.movieDetail !== undefined}
        onClose={this.props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box className="detailBox">
          <Box className="detailImageBox">
            <img
              alt={this.props.movie.title}
              src={
                this.props.movie.imageUrl === undefined
                  ? "../images/not_found.jpg"
                  : this.props.movie.imageUrl
              }
            />
          </Box>
          <Box className="detailTextBox">
            <Typography variant="h3">{this.props.movie.title}</Typography>
            <Typography variant="h6" style={{ padding: 20 }}>
              {this.props.movie.year +
                " - " +
                this.props.movie.type +
                " - " +
                Math.floor(this.props.movie.min / 60) +
                "h " +
                Math.round(
                  (this.props.movie.min / 60 -
                    Math.floor(this.props.movie.min / 60)) *
                    60 *
                    100
                ) /
                  100 +
                "m"}
            </Typography>
            <Typography>{this.props.movieDetail}</Typography>
            <Box>
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
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.props.onShowRelated}
            >
              Show related movies
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
}
