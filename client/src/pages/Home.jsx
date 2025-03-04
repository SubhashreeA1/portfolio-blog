import { Container, Row, Col, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Welcome to My Portfolio</h1>
          <p className="lead">A showcase of my work, blog, and projects.</p>
          <Button variant="primary" href="/portfolio">View Portfolio</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
