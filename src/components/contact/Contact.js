import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import avatar from "../../assets/avatar.jpeg";
import Navbar from "../home/Navbar/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Container
        className="py-5 rounded p-5"
        style={{ backgroundColor: "#f9fdff" }}
      >
        <Row>
          <Col lg={6} className="py-4">
            <a
              href="https://manish-kumar-choudhary.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={avatar}
                alt="Avatar"
                width="300px"
                className="img-fluid rounded-circle ml-5 mt-5 mb-5"
              />
            </a>
          </Col>
          <Col lg={6} className="py-4 mt-2">
            <div>
              <h1 style={{ color: "#1c4bab", fontSize: "2.2rem" }}>
                I'm Manish Kumar Choudhary

              </h1>

              <p style={{ color: "#565a5a" }}>
                I am Manish Kumar Choudhary, a B.Tech student at JIET, Jodhpur (CGPA 9.84). With hands-on experience in Java, Spring Boot, React, and Docker, I recently interned at Platform Commons, optimizing Java backend services in a microservices setup using Kafka, Solr, and Elasticsearch.
              </p>
              <p>Let's create something extraordinary together! 🚀</p>
            </div>
            <h3 className="mb-4 mt-5">Contact Info</h3>
            <p className="mb-1">+91 8955946276</p>
            <p className="mb-1">
              <a
                href="mailto:cmanishkumar193@gmail.com"
                style={{ textDecoration: "none", color: "#1138bb" }}
              >
                cmanishkumar193@gmail.com
              </a>
            </p>
            <p className="mb-1">Jodhpur, India-342802</p>
            <p>
              Visit my{" "}
              <a
                href="https://manish-kumar-choudhary.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#560ad1" }}
              >
                portfolio
              </a>{" "}
              for more information.
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/manishkumarchoudhary/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Linkedln
              </a>{" "}
              <a
                className="ml-2"
                href="https://github.com/Manishkumarchoudhary2003"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Github
              </a>{" "}
              <a
                className="ml-2"
                href="https://www.instagram.com/manish_.96/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Instagram
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
