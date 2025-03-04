import { useEffect, useState } from "react";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/blogs")
      .then(response => {
        console.log("Blog Data:", response.data);
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center">Blog Posts</h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error Message */}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* Blog Posts */}
      {!loading && !error && blogs.length > 0 ? (
        blogs.map(blog => (
          <Card className="mb-3 shadow-sm" key={blog._id}>
            <Card.Body>
              <Card.Title className="fw-bold text-white">{blog.title}</Card.Title>
              <Card.Text className="text-white">{blog.content.substring(0, 100)}...</Card.Text>
              <Button as={Link} to={`/blog/${blog._id}`} variant="primary">
                Read More
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        !loading && !error && (
          <p className="text-center text-muted">No blog posts available.</p>
        )
      )}
    </Container>
  );
};

export default Blog;
