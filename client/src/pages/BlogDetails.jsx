import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching blog details:", error));
  }, [id]);

  return (
    <Container className="mt-4">
      {loading ? (
        <Spinner animation="border" />
      ) : blog ? (
        <Card className="p-4 bg-dark text-white">
          <h2 className="text-white">{blog.title}</h2>
          <p><strong>By {blog.author}</strong></p>
          <hr />
          <p>{blog.content}</p>
        </Card>
      ) : (
        <p className="text-white">Blog post not found.</p>
      )}
    </Container>
  );
};

export default BlogDetails;
