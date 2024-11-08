import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature1 from "../../assets/feature1.jpg";

const Features1 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "250px", marginBottom: "100px" }}
    >
      <Row>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
        >
          {/* Empty column to apply background image */}
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{
            padding: "10px 50px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2.5rem" }}>
              Seamlessly Upload  etadata
            </h1>
            <p>
              Easily upload your files along with essential metadata. Peer Vault
              ensures that all your files are organized and accessible with the
              right information, allowing you to manage and track your files
              efficiently.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features1;
