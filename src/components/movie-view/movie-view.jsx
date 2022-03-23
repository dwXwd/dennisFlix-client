import React from 'react';
import {Container, Col, Row, Button, Card} from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row className="movie-poster">
          <Col>
            <Card id="movie-view">
              <Card.Body>
              <Card.Img id="movie-view-image" variant="top" src={movie.ImagePath} />
              <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
              <Card.Text id="movie-description" className="movie-description">
                  {movie.Description}</Card.Text>
              <Card.Text id="movie-director" className="movie-director">
                  Director: {movie.Director.Name}</Card.Text>
              <Card.Text id="movie-genre" className="movie-gerne">
                  Genre: {movie.Genre.Name}</Card.Text>
              <Card.Text id="movie-actors" className="movie-actors">
                Actors: {movie.Actors}</Card.Text>
              </Card.Body>
            </Card>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
       </Container>
    );
  }


}


export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }
}
