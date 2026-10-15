
export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  return (
    <div
      className={`toast toast-${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      <span className="toast-icon">
        {type === "error" ? "❌" : "✅"}
      </span>

      <span className="toast-message">{message}</span>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
