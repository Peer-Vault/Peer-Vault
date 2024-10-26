import { ApiClient } from "./ApiClient";

export const allFilesApiService = async (userId, token) => {
    try {
        const response = await ApiClient.get(`/file/user/${userId}/files`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Files fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching files:", error);
        throw error;
    }
};

export const uploadFileApiService = async (file, fileName, fileType, userId, description, token) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        formData.append('fileType', fileType);
        formData.append('userId', userId);
        formData.append('description', description);

        const response = await ApiClient.post(`/file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // You can use percentCompleted to update progress bars if needed
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};



export const shareFileApiService = async (fileId, email, token) => {
    try {
        const formData = new FormData();
        formData.append('fileId', fileId);
        formData.append('email', email);

        const response = await ApiClient.post(`/file/share`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        });

        console.log("File shared successfully");
        return response.data;
    } catch (error) {
        console.error("Error sharing file:", error);
        throw error;
    }
};

export const downloadFileApiService = async (hash, token) => {
    try {
        const response = await ApiClient.get(`/file/download/${hash}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        return response;
    } catch (error) {
        console.error("Error downloading files:", error);
        throw error;
    }
};


export const downloadSharedFileApiService = async (hash) => {
    try {
        const response = await ApiClient.get(`/file/download/shared/${hash}`, {
            responseType: 'blob',
        });

        return response;
    } catch (error) {
        console.error("Error downloading files:", error);
        throw error;
    }
};



export const deleteFileApiService = async (fileId, token) => {
    try {
        const response = await ApiClient.delete(`/file/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: fileId,
            },
        });

        console.log("File deleted successfully");
        return response.data;
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
};



// export const deleteFileApiService = async (fileId, token) => {
//     try {
//         const formData = new FormData();
//         formData.append('fileId', fileId);

//         const response = await ApiClient.delete(`/file/delete`, formData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         });

//         console.log("File Deleted successfully");
//         return response.data;
//     } catch (error) {
//         console.error("Error deleting file:", error);
//         throw error;
//     }
// };