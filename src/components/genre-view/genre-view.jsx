import React from 'react';
import {Container, Col, Row, Button, Card} from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick} = this.props;

    return (
      <Container className="genre-view">
        <Row>
          <Col>
            <Card id="genre-view">
              <Card.Body>
              <Card.Title id="genre-title" className="genre-title">{genre.Name}</Card.Title>
              <Card.Text id="genre-Description" className="genre-bio">
                  {genre.Description}</Card.Text>
            
              </Card.Body>
            </Card>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
       </Container>
    );
  }


}


