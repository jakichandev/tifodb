import "../../index.css";
import "./Elements.css";

const Button = ({ content, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export default Button;
