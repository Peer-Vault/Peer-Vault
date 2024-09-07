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
import { allFilesApiService, shareFileApiService, downloadFileApiService, deleteFileApiService } from "../../api/FileApiService";

const AllFiles = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [email, setEmail] = useState("");
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token && userId) {
      setLoading(true);
      allFilesApiService(userId, token)
        .then((data) => {
          setFileData(data);
        })
        .catch((err) => {
          setError("Failed to load files.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("User is not authenticated.");
    }
  }, [token, userId]);

  const filteredFiles = fileData.filter((file) => {
    const fileName = file.fileName ? file.fileName.toLowerCase() : "";
    const description = file.description ? file.description.toLowerCase() : "";
    const searchQueryLower = searchQuery.toLowerCase();

    return (
      fileName.includes(searchQueryLower) ||
      description.includes(searchQueryLower)
    );
  });

  const handleShareClick = (fileId) => {
    setSelectedFileId(fileId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail("");
  };

  const handleConfirmShare = async () => {
    console.log("File ID to share:", selectedFileId);
    console.log("Recipient's email:", email);

    try {
      const token = localStorage.getItem("token");
      await shareFileApiService(selectedFileId, email, token);

      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error sharing the file:", error);
      alert('Failed to share the file.');
    }

    handleCloseModal();
  };

  const handleOpenFile = async (hash) => {
    try {
      const token = localStorage.getItem("token");
      const response = await downloadFileApiService(hash, token);

      // Create a Blob from the byte array in the response
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create an object URL from the Blob
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url, "_blank");

      // Optionally revoke the object URL after use to free memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error opening the file:", error);
    }
  };



  const handleDeleteClick = async (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        const token = localStorage.getItem("token");
        await deleteFileApiService(fileId, token);
        alert('File deleted successfully.');
        window.location.reload();
      } catch (error) {
        console.error("Error deleting the file:", error);
        alert('Failed to delete the file.');
      }
    }
  };

  const handleDownloadFile = async (hash) => {
    try {
      const token = localStorage.getItem("token");
      const response = await downloadFileApiService(hash, token);

      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].split(';')[0].replace(/['"]/g, '')
        : 'downloadedFile';

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

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
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {file.fileName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {file.fileSize}
                    </Card.Subtitle>
                    <Card.Text>
                      Description: {file.description}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        {new Date(file.uploadDate).toLocaleString()}
                      </small>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 d-flex justify-content-end">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id={`dropdown-basic-${file.id}`}
                        className="text-decoration-none"
                      >
                        <i className="bi bi-three-dots"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleOpenFile(file.cid)}>
                          Open
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDownloadFile(file.cid)}>
                          Download
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShareClick(file.id)}>
                          Share
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteClick(file.id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {showSuccessAlert && (
          <div className="position-fixed top-50 start-50 translate-middle p-3">
            <Alert variant="success">File shared successfully!</Alert>
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
