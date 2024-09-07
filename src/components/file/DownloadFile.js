import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { downloadFileApiService } from "../../api/FileApiService"; // Import your API service

const DownloadFile = () => {
    const { hash } = useParams(); // Extract hash from URL
    const navigate = useNavigate(); // Hook for navigation
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const handleDownloadFile = async (hash) => {
            try {
                const token = localStorage.getItem("token");
                const response = await downloadFileApiService(hash, token);

                // Create a Blob from the byte array in the response
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Extract filename from Content-Disposition header
                const contentDisposition = response.headers['content-disposition'];
                const filename = contentDisposition
                    ? contentDisposition.split('filename=')[1].split(';')[0].replace(/['"]/g, '')
                    : 'downloadedFile';

                // Create an object URL for the Blob
                const url = window.URL.createObjectURL(blob);

                // Create a link element and simulate a click to start the download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();

                // Clean up the link element and revoke the object URL
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);

                navigate(`/file/${userId}/all-files`);

            } catch (error) {
                console.error("Error downloading the file:", error);
            }
        };

        if (hash) {
            handleDownloadFile(hash);
        }
    }, [hash, navigate, userId]);

    return <div>Downloading file...</div>;
};

export default DownloadFile;
