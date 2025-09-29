import { useEffect, useState } from "react";

const MessageBanner = ({ error }) => {
  return <p className="error-banner-message">{error.message}</p>;
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
    setClassName("success visible");
  }, [error.status, error.message, error.label]);

  return (
    <div className={`status-banner ${className}`}>
      <h5>{label}</h5>
      <MessageBanner error={error} />
    </div>
  );
};

export default StatusBanner;
