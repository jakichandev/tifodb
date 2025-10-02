const StatusBanner = ({ error, label, className = "" }) => {
  return (
    <div className={`${className ? "status-banner " + className : "status-banner"}`}>
      <h5>{label}</h5>
      <p>{error.message}</p>
    </div>
  );
};

export default StatusBanner;
