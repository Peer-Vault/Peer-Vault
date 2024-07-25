import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import secure from "../../assets/secure.png";
import easy from "../../assets/easy.png";
import service from "../../assets/service.png";

const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "100";

  const register = () => {
    navigate("/user/auth/register");
  };

  const goToForm = () => {
    navigate(`/file/all-files`);
  };

  return (
    <Container className="mt-5" style={{ marginBottom: "100px" }}>
      <Row className="p-4" style={{ backgroundColor: "#d9e6f4" }}>
        <Col md={12} className="text-center mb-4">
          <h1 style={{ fontSize: "3rem" }}>Welcome to Peer Vault</h1>
          <p>
            Peer Vault empowers you to store and share files securely and
            easily.
          </p>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6} className="d-flex align-items-center">
          <div>
            <h2>Seamlessly Upload Files with Metadata</h2>
            <p>
              Easily upload your files along with essential metadata. Peer Vault
              ensures that all your files are organized and accessible with the
              right information, allowing you to manage and track your files
              efficiently.
            </p>
            <Button
              onClick={goToForm}
              variant="primary"
              size="lg"
              style={{ marginBottom: "20px" }}
            >
              Go to Files
            </Button>
            {!isAuthenticated && (
              <p>
                Don't have an account?{" "}
                <span
                  onClick={register}
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
            )}
          </div>
        </Col>

        <Col
          md={6}
          style={{
            backgroundImage:
              'url("https://extrimian.io/wp-content/uploads/2024/03/Centralized-data-storage-system-vs-IPFS-interplanetary-file-system-1-1024x576.png")',
            backgroundSize: "90%", // Adjust the percentage to zoom in more or less
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "500px",
          }}
        >
          {/* Empty column to apply background image */}
        </Col>
      </Row>

      <Row className="text-center mt-5">
        <Col md={4}>
          <img
            src={secure}
            alt="Secure"
            style={{ height: "150px", width: "150px", objectFit: "cover" }}
          />
          <h3>Secure</h3>
          <p>Keep your files safe with top-notch security features.</p>
        </Col>
        <Col md={4}>
          <img
            src={easy}
            alt="Easy to Use"
            style={{ height: "150px", width: "150px", objectFit: "cover" }}
          />
          <h3>Easy to Use</h3>
          <p>Simple and intuitive interface for seamless file sharing.</p>
        </Col>
        <Col md={4}>
          <img
            src={service}
            alt="Reliable"
            style={{ height: "150px", width: "150px", objectFit: "cover" }}
          />
          <h3>Reliable</h3>
          <p>Dependable service with 24/7 support.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
