import { useRef, useEffect } from "react";
import { Briefcase } from "lucide-react";

function JobDescriptionCard({ value, onChange, loading }) {
  const textareaRef = useRef(null);

  // Auto resize height based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to calculate scrollHeight accurately
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const characterCount = value.length;

  return (
    <div className="job-desc-container">
      <textarea
        placeholder="Paste the target job description (e.g. key qualifications, required skills, duties)..."
        id="job-desc-textarea"
        ref={textareaRef}
        className="modern-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        rows={8}
      />
      <div className="textarea-footer">
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Briefcase size={12} />
          {loading ? "Locked during processing" : "Auto-saves to current scan session"}
        </span>
        <span>{characterCount.toLocaleString()} characters</span>
      </div>
    </div>
  );
}

export default JobDescriptionCard;
