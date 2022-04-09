import React from 'react';
import {Container, Col, Row, Button, Card} from 'react-bootstrap';

/*const isDead = () => {
  if(director.Death) {

      return ( 
      <Card.Text id="movie-actors" className="movie-actors">
      Born: {director.Death}</Card.Text>
      );
  } else {
      return false;
  }
};*/

export class DirectorView extends React.Component {

  render() {
    const {director, onBackClick, isDead} = this.props;

    return (
      <Container className="director-view">
        <Row>
          <Col>
            <Card id="director-view">
              <Card.Body>
              <Card.Title id="director-title" className="director-title">{director.Name}</Card.Title>
              <Card.Text id="director-bio" className="director-bio">
                  {director.Bio}</Card.Text>

              <Card.Text id="movie-actors" className="movie-actors">
                Born: {director.Birth}</Card.Text>
            
                
            )
            
              </Card.Body>
            </Card>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
       </Container>
    );
  }


}
