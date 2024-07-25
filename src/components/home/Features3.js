import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature3 from "../../assets/feature3.png";

const Features3 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "250px", marginBottom: "250px" }}
    >
      <Row>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature3})`,
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
            <h2 style={{ fontSize: "2.5rem" }}>
              Efficiently Access and Manage Your Files
            </h2>
            <p>
              Peer Vault provides a user-friendly interface to manage your files
              efficiently. Access your uploaded files, view metadata, and keep
              track of shared files all in one place, ensuring easy management
              and retrieval whenever you need it.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features3;
