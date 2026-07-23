import { useRef, useState } from "react";

function TranscriptUpload({ onUpload }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    if (onUpload) {
      onUpload(file);
    }
  };

  return (
    <section className="transcript-upload">

      <div className="upload-header">

        <h2>Transcript Upload</h2>

        <p>
          Upload your unofficial transcript to automatically analyze
          completed coursework and degree progress.
        </p>

      </div>

      <div
        className="upload-box"
        onClick={openFilePicker}
      >

        <h3>Upload Transcript</h3>

        <p>
          Click anywhere in this box to choose a PDF transcript.
        </p>

        <button
          className="upload-button"
          type="button"
        >
          Choose File
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={handleFileChange}
        />

      </div>

      {selectedFile && (

        <div className="selected-file">

          <span>Selected File</span>

          <h4>{selectedFile.name}</h4>

          <p>
            Ready to upload and analyze.
          </p>

        </div>

      )}

    </section>
  );
}

export default TranscriptUpload;