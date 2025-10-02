import "./WarningsBanner.css";

export const warningStates = {
  default: {
    text: "Are you sure you want to proceed?",
    buttonsText: { yes: "Confirm", no: "Cancel" },
    className: "warning-banner",
  },
  success: {
    text: "Action completed successfully!",
    buttonsText: { yes: null, no: "Close" },
    className: "warning-banner success",
  },
  error: {
    text: "An error occurred. Please try again.",
    buttonsText: { yes: null, no: "Close" },
    className: "warning-banner error",
  },
};

export const WarningsBanner = ({
  label,
  buttonsText,
  onConfirm,
  onCancel,
  className,
}) => {
  return (
    <>
    <div className={className}>
      <p>{label}</p>
      <div className="buttons">
        {buttonsText.yes && (
          <button className="btn-primary yes" onClick={onConfirm}>
            {buttonsText.yes}
          </button>
        )}
        {buttonsText.no && (
          <button className="btn-primary no" onClick={onCancel}>
            {buttonsText.no}
          </button>
        )}
      </div>
    </div>
    <div className="overlay"></div>
    </>
  );
};
