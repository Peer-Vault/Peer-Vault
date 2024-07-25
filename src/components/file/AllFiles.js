import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Dropdown,
} from "react-bootstrap";



const dummyFiles = [
  {
    id: 1,
    fileName: "Document.pdf",
    fileType: "PDF",
    fileSize: "1.2 MB",
    CID: "Qm123456789",
    uploadDate: new Date().toLocaleString(),
    fileUrl: "https://example.com/document.pdf",
    userId: 1,
    description: "This is a PDF document.",
  },
  {
    id: 2,
    fileName: "Image.png",
    fileType: "Image",
    fileSize: "2.4 MB",
    CID: "Qm987654321",
    uploadDate: new Date().toLocaleString(),
    fileUrl: "https://example.com/image.png",
    userId: 2,
    description: "This is an image file.",
  },
];

const AllFiles = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [email, setEmail] = useState("");
  const [fileData, setFileData] = useState(dummyFiles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      setFileData(dummyFiles);
    } catch (err) {
      setError("Failed to load files.");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredFiles = fileData.filter(
    (file) =>
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShareClick = (fileUrl) => {
    setSelectedFileUrl(fileUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail("");
  };

  const handleConfirmShare = () => {
    console.log("File URL to share:", selectedFileUrl);
    console.log("Recipient's email:", email);
    // Add logic to actually send the email

    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 2000); // Show success alert for 2 seconds

    handleCloseModal();
  };

  // Email validation function
  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="align-items-center mb-5">
          <Col md={3}>
            <h2>All Files</h2>
          </Col>
          <Col md={8}>
            <div className="input-group">
              <input
                type="text"
                className="form-control border-0 rounded-0"
                placeholder="Search by file name or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ height: "40px" }}
              />
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="container text-center mt-5">
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : !Array.isArray(fileData) ? (
          <div className="container text-center mt-5">
            <Alert variant="danger">
              Data received from the server is not in the expected format
            </Alert>
          </div>
        ) : fileData.length === 0 ? (
          <div className="container text-center mt-5">
            <Alert variant="info">No files available</Alert>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="container text-center mt-5">
            <Alert variant="info">No files found</Alert>
          </div>
        ) : (
          <Row className="row-cols-1 row-cols-md-3">
            {filteredFiles.map((file) => (
              <Col md={4} key={file.id} className="mb-4">
                <Card className="h-100 shadow position-relative">
                  <Card.Body>
                    <Card.Title>{file.fileName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {file.fileType} - {file.fileSize}
                    </Card.Subtitle>
                    <Card.Text>{file.description}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        Uploaded on: {file.uploadDate}
                      </small>
                    </Card.Text>
                    <Dropdown className="dropdown-custom position-absolute bottom-0 end-0 p-3">
                      <Dropdown.Toggle
                        variant="link"
                        id={`dropdown-basic-${file.id}`}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          transition: "background-color 0.3s, border 0.1s",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "50%",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "black",
                            marginTop: "2px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "black",
                            marginTop: "2px",
                          }}
                        ></div>
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "black",
                            marginTop: "2px",
                          }}
                        ></div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-custom">
                        <Dropdown.Item
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open File
                        </Dropdown.Item>
                        <Dropdown.Item
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          Download File
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleShareClick(file.fileUrl)}
                        >
                          Share File
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {showSuccessAlert && (
          <div className="position-fixed top-50 start-50 translate-middle p-3">
            <Alert variant="success">
              File shared successfully!
            </Alert>
          </div>
        )}
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Recipient's Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter recipient's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!isEmailValid(email)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmShare}
            disabled={!isEmailValid(email)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllFiles;
