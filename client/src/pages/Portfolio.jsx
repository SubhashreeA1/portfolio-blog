import { Container, Row, Col, Card } from "react-bootstrap";

const Portfolio = () => {
  return (
    <Container>
      <h2>My Portfolio</h2>
      <Row className="justify-content-center">
        <Col md={4} sm={6} className="mb-4">
          <Card>
            <Card.Img variant="top" src="/images/project1.jpg" alt="Project 1" />
            <Card.Body>
              <Card.Title style={{ color: "white" }}>Project 1</Card.Title>
              <Card.Text style={{ color: "white" }}>Description of Project 1</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} className="mb-4">
          <Card>
            <Card.Img variant="top" src="/images/project2.jpg" alt="Project 2" />
            <Card.Body>
              <Card.Title style={{ color: "white" }}>Project 2</Card.Title>
              <Card.Text style={{ color: "white" }}>Description of Project 2</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Portfolio;
