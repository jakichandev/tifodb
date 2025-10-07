import "../../index.css";
import "./Elements.css";

const Button = ({ content, className, onClick, txtCol, borderColor }) => {
  return (
    <button onClick={onClick} className={className} style={{color: txtCol, borderColor: borderColor}}>
      {content}
    </button>
  );
};

export default Button;
