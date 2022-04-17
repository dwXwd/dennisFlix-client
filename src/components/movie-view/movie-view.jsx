import React from "react";
import "./movie-view.scss"
import { Card, Col, Container, Row, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios'

export class MovieView extends React.Component {
 
  constructor(props) {
    super(props);
    this.addFav = this.addFav.bind(this);
    this.state = {
      favoriteMovieList: []
    }
    
  }




  addFav(id) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    /*axios.post(`https://dennisflix.herokuapp.com/users/${username}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })*/
    axios({ method: 'post', url: `https://dennisflix.herokuapp.com/users/${username}/movies/${id}`, headers: { 'Authorization': 'Bearer ' + token } })


      .then(() => {
        alert('Added to list')
      })
      .catch(e => {
        console.log(e);
        alert('Does not work')
      });
    }

    render() {
      const { movie, onBackClick} = this.props;

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
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                  <Card.Text id="movie-actors" className="movie-actors">
                    Actors: {movie.Actors}</Card.Text>
                </Card.Body>
              </Card>
              <Button onClick={() => { onBackClick(null); }}>Back</Button>  <Button variant="outline-danger" onClick={() => this.addFav(movie._id) }>Add to Favorites</Button>
            </Col>
          </Row>
        </Container>
      );
    }


  }

/*
export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }
}*/
