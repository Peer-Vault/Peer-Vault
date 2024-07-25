import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../home/Navbar/Navbar";

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
  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center mb-4">All Files</h1>
          </Col>
        </Row>
        <Row>
          {dummyFiles.map((file) => (
            <Col md={4} key={file.id} className="mb-4">
              <Card>
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
                  <Card.Link href={file.fileUrl} target="_blank">
                    View File
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllFiles;
