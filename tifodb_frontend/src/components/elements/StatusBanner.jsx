import { useEffect, useState } from "react";

const MessageBanner = ({ error }) => {
  <p className="error-banner-message">{error.message}</p>;
};

const StatusBanner = ({ error }) => {
  const [label, setLabel] = useState("Successo");
  const [className, setClassName] = useState("success hide");
  useEffect(() => {
    if (error.status) {
      setLabel("Errore!");
      setClassName("error visible");
      return;
    }
    setLabel("Successo!");
  }, [error.status]);

  return (
    <div className={`status-banner ${className}`}>
      <h5>{label}</h5>
      {error.status && <MessageBanner error={error}></MessageBanner>}
    </div>
  );
};

export default StatusBanner;
