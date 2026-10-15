export default function ConfirmDialog({
  title = "Are you sure?",
  message = "Do you want to continue?",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="dialog-overlay">
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-icon">⚠️</div>

        <h2 id="dialog-title">{title}</h2>
        <p>{message}</p>

        <div className="dialog-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
