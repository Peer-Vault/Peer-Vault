import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature2 from "../../assets/feature2.png"

const Features2 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "200px", marginBottom: "100px" }}
    >
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{
            padding: "10px 50px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2.5rem" }}>
              Effortlessly Share Files via Email
            </h2>
            <p>
              Share your files with others directly via email. Peer Vault makes
              it easy to send file links to recipients, ensuring they receive
              the necessary information and access to the files you want to share.
            </p>
          </div>
        </Col>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "370px",
            maxWidth: "100%",
            padding: "50px"
          }}
        ></Col>
      </Row>
    </Container>
  );
};

export default Features2;
