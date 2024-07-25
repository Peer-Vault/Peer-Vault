import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Navbar from "../home/Navbar/Navbar";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email address.";
    if (!formData.password) errors.password = "Password is required.";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password))
      errors.password = "Password must contain at least one special character.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    console.log("Form Data:", formData);
    localStorage.setItem("login", 1);
    navigate("/");
    setSuccessMessage("Login successful.");
    setFormData({ email: "", password: "" });
    setTimeout(() => setSuccessMessage(""), 500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    return Object.keys(validateForm()).length === 0;
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5 p-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h1 className="mb-4">Login</h1>
            {Object.values(errors).length > 0 && (
              <Alert variant="danger">{Object.values(errors).join(", ")}</Alert>
            )}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            <p>Please fill out the form to login:</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  required
                  style={{ backgroundColor: "#f0f0f0" }}
                  className="text-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <InputGroup>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    required
                    style={{ backgroundColor: "#f0f0f0" }}
                    className="text-secondary"
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                className="mt-3 w-100"
                disabled={!isFormValid()}
              >
                Login
              </Button>
            </Form>
            <p className="mt-3">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/user/auth/register")}
                style={{
                  textDecoration: "none",
                  color: "#1372c0",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#000000")}
                onMouseLeave={(e) => (e.target.style.color = "#1372c0")}
              >
                Register here
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
