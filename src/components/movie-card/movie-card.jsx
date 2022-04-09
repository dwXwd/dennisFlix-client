import React from 'react';
import PropTypes from 'prop-types';
import {Container, Col, Row, Card, Button, CardGroup} from 'react-bootstrap';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container>
      <CardGroup>
          <Card id="movie-card">
              <Card.Body>
                  <Card.Title id="card-button">{movie.Title}</Card.Title>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
              </Card.Body>
          </Card>
      </CardGroup>
  </Container>
    );
  }
}

//define what Props can be imported

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Actors: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};