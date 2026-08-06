import { useState, useRef } from "react";
import { UploadCloud, FileText, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

function DragDropUpload({ files, onFilesChange, loading }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (fileList) => {
    const validExtensions = [".pdf", ".docx", ".doc"];
    const verifiedFiles = Array.from(fileList).filter((file) => {
      const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!validExtensions.includes(extension)) {
        alert(`Invalid file type: ${file.name}. Only PDF, DOC, and DOCX files are allowed.`);
        return false;
      }
      return true;
    });

    if (verifiedFiles.length > 0) {
      // Append unique files by name
      onFilesChange((prev) => {
        const existingNames = prev.map((f) => f.name);
        const newAdditions = verifiedFiles.filter((f) => !existingNames.includes(f.name));
        return [...prev, ...newAdditions];
      });
    }
  };

  const removeFile = (fileName) => {
    onFilesChange((prev) => prev.filter((f) => f.name !== fileName));
  };

  const triggerInputClick = () => {
    fileInputRef.current.click();
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div>
      <div
        className={`drag-drop-zone ${dragActive ? "active-drag" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerInputClick}
      >
        <input
          placeholder="File Upload Input"
          id="file-upload-input"
          ref={fileInputRef}
          type="file"
          className="hidden-file-input"
          multiple
          accept=".pdf,.docx,.doc"
          onChange={handleChange}
          style={{ display: "none" }}
          disabled={loading}
        />

        <div className="upload-icon-pulse">
          <UploadCloud size={28} />
        </div>

        <p className="drag-drop-text">
          Drag & drop resumes here or <span style={{ color: "var(--primary)", textDecoration: "underline" }}>browse</span>
        </p>
        <p className="drag-drop-subtext">Supports PDF, DOC, DOCX files (Max 10MB)</p>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "8px", fontWeight: 600 }}>
            Attached Resumes ({files.length})
          </h4>
          <div className="uploaded-files-list">
            {files.map((file, index) => (
              <div key={file.name + index} className="uploaded-file-item">
                <div className="uploaded-file-info">
                  <FileText size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
                  <div style={{ overflow: "hidden" }}>
                    <div className="file-title-wrap" title={file.name}>{file.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{formatBytes(file.size)}</div>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                  title="Remove file"
                  disabled={loading}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DragDropUpload;
