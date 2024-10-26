import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Row, Col, ProgressBar, Spinner, Alert } from 'react-bootstrap';
import { uploadFileApiService } from "../../api/FileApiService";
import { useNavigate } from 'react-router-dom';

const UploadFile = () => {
  const [fileMeta, setFileMeta] = useState({ file: null });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // State for success message
  const fileInputRef = useRef(null); // Create a ref for the file input
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadSuccess) {
      const userId = localStorage.getItem("userId");
      const timer = setTimeout(() => {
        setUploadSuccess(false); // Hide the success message after 2 seconds
      }, 2000); // 2000 milliseconds = 2 seconds
      navigate(`/file/${userId}/all-files`);
      return () => clearTimeout(timer); // Cleanup timer on component unmount or when uploadSuccess changes
    }
  }, [uploadSuccess]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileMeta({ file });
      console.log(fileMeta);
      handleSubmit(file); // Pass file to handleSubmit
    }
  };

  const handleSubmit = async (file) => {
    try {
      setIsUploading(true);
      setUploadSuccess(false); // Reset success message

      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const fileName = file.name;
      const fileType = file.type;
      const description = 'File description'; // Modify as needed

      const response = await uploadFileApiService(file, fileName, fileType, userId, description, token);

      console.log('File upload response:', response); // Log the API response
      setUploadProgress(100); // Set progress to 100% upon completion
      setIsUploading(false);
      setUploadSuccess(true); // Set success message
      setFileMeta({ file: null });
      fileInputRef.current.value = ''; // Clear the file input field
    } catch (error) {
      console.error('File upload failed:', error); // Handle errors appropriately
      setIsUploading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Upload File</h1>
          <Form>
            <Form.Group controlId="formFile" className="mb-4 position-relative">
              <Form.Label className="sr-only">Upload File</Form.Label>
              <div className="position-relative">
                {/* Hidden file input */}
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  ref={fileInputRef} // Attach the ref to the file input
                  style={{ display: 'none' }} // Hide the default file input
                />
                {/* Custom upload area */}
                <div
                  className="custom-file-upload position-relative"
                  style={{
                    height: '200px',
                    padding: '20px',
                    border: '1px solid #ddd', // Thin border
                    outline: 'none',
                    textAlign: 'center', // Center text
                    fontSize: '1.5rem', // Larger font size
                    cursor: 'pointer', // Pointer cursor
                    backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg_ri9E8XxXRafeIMA4QGosabTMk_wP7pTDQ&s')", // Set the background image
                    backgroundSize: '60%', // Zoom in by 150%
                    backgroundPosition: 'center', // Center the image
                    backgroundRepeat: 'no-repeat',
                    color: 'transparent', // Hide the default text
                  }}
                  onClick={() => fileInputRef.current.click()} // Trigger file input click
                >
                  {isUploading && (
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
                        zIndex: 10, // Ensure it appears above the file input
                      }}
                    >
                      <div className="text-center">
                        <Spinner
                          animation="border"
                          role="status"
                          style={{ width: '3rem', height: '3rem' }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <div className="mt-2">Uploading...</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Form.Group>
            {isUploading && (
              <div className="text-center mt-4">
                <ProgressBar
                  animated
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  style={{ height: '20px' }}
                />
              </div>
            )}
            {uploadSuccess && (
              <div className="text-center mt-4">
                <Alert variant="success">File uploaded successfully!</Alert>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadFile;
