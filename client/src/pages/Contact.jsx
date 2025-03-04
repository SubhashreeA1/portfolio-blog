import { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ submitted: false, error: false, loading: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate empty fields
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitted: false, error: "All fields are required!", loading: false });
      return;
    }

    setStatus({ submitted: false, error: false, loading: true });

    try {
      await axios.post("/api/contact", formData);
      setStatus({ submitted: true, error: false, loading: false });
      setFormData({ name: "", email: "", message: "" }); // Clear form after submission
    } catch (error) {
      setStatus({ submitted: false, error: "Error sending message. Try again later!", loading: false });
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Contact Me</h2>

      {/* Success Message */}
      {status.submitted && <Alert variant="success">✅ Message sent successfully!</Alert>}

      {/* Error Message */}
      {status.error && <Alert variant="danger">❌ {status.error}</Alert>}

      <Form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-dark text-white">
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Message</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100" disabled={status.loading}>
          {status.loading ? <Spinner animation="border" size="sm" /> : "Send Message"}
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
