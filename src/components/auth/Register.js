import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import styles from "./Register.module.css"; // Import the CSS module
import { Eye, EyeSlash } from "react-bootstrap-icons"; // Import icons
import { userRegisterApiService } from "../../api/AuthApiService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    profilePictureUrl: "",
    bio: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateStep1 = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required.";
    if (!formData.firstName) errors.firstName = "First Name is required.";
    if (!formData.lastName) errors.lastName = "Last Name is required.";
    if (!formData.gender) errors.gender = "Gender is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email address.";
    if (!formData.password) errors.password = "Password is required.";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters long.";
    if (!/(?=.*\W)/.test(formData.password))
      errors.password = "Password must contain at least one special character.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required.";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      errors.phoneNumber = "Phone number must be exactly 10 digits long.";
    if (!formData.dateOfBirth)
      errors.dateOfBirth = "Date of Birth is required.";
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.profilePictureUrl)
      errors.profilePictureUrl = "Profile Picture URL is required.";
    if (!formData.bio) errors.bio = "Bio is required.";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      const step1Errors = validateStep1();
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
      setErrors({});
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 2) {
      const step2Errors = validateStep2();
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        return;
      }

      setErrors({});

      const dataToSubmit = { ...formData, dateOfBirth: `${formData.dateOfBirth}T00:00:00` };
      delete dataToSubmit.confirmPassword;

      try {
        const response = await userRegisterApiService(dataToSubmit);
        console.log(response.data);
        if (response.data && response.data.id) {
          localStorage.setItem("userId", response.data.id);
        }
        // sessionStorage.setItem("userId", response.data.id);
        setSuccessMessage("User registered successfully.");

        // Display the success message for 2 seconds, then navigate to login
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/user/auth/login");
        }, 2000);
      } catch (error) {
        setErrors({ apiError: error.message });
      }

      setFormData({
        username: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
        profilePictureUrl: "",
        bio: "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStep(1);
    }
  };


  const isStep1Valid = Object.keys(validateStep1()).length === 0;
  const isStep2Valid = Object.keys(validateStep2()).length === 0;

  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col md={8} lg={6} className="mx-auto">
            <h2 className={styles.formTitle}>Register</h2>
            {Object.values(errors).map((error, index) => (
              <Alert key={index} variant="danger" className={styles.alert}>
                {error}
              </Alert>
            ))}
            {successMessage && (
              <Alert variant="success" className={styles.alert}>
                {successMessage}
              </Alert>
            )}
            <Form className={styles.formWrapper}>
              {step === 1 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.username}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.firstName}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.lastName}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.gender}
                      required
                    >
                      <option value="">Select your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.email}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      Password
                    </Form.Label>
                    <InputGroup>
                      <FormControl
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.formControl}
                        isInvalid={!!errors.password}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeSlash /> : <Eye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      Confirm Password
                    </Form.Label>
                    <InputGroup>
                      <FormControl
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={styles.formControl}
                        isInvalid={!!errors.confirmPassword}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeSlash /> : <Eye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                  >
                    Next
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.phoneNumber}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      Date of Birth
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.dateOfBirth}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.address}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>
                      Profile Picture URL
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="profilePictureUrl"
                      placeholder="Enter profile picture URL"
                      value={formData.profilePictureUrl}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.profilePictureUrl}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="bio"
                      rows={3}
                      placeholder="Enter your bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className={styles.formControl}
                      isInvalid={!!errors.bio}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" type="button" onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={!isStep2Valid}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
