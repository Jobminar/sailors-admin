import React, { useState } from 'react';
import axios from 'axios';

const FileDisplay = () => {
    // const [photoId]=useState("670ccd1e7e0054872024fa5e")
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle showing the file using photoId
  const handleShowFile = async () => {
    try {
      const response = await axios.get(`http://localhost:7001/fileById/671206f22f48b34c25017500`, {
        responseType: 'blob', // Get the file as a binary large object (blob)
      });

      const fileURL = URL.createObjectURL(new Blob([response.data]));
      setFile(fileURL);
    } catch (err) {
      console.error('Error fetching file:', err);
      setError('Failed to fetch the file.');
    }
  };

  return (
    <div>
      <button onClick={handleShowFile}>Show File</button>

      {file && (
        <div>
          <h3>File Preview:</h3>
          <img src={file} alt="Uploaded file" width="300" />
          {/* If it's a non-image file, you can download it */}
          <a href={file} download="file">Download file</a>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default FileDisplay;
