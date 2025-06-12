import "../../index.css";
import "./Elements.css";

const Button = ({ content, className }) => {
  return <button className={className}>{content}</button>;
};

export default Button;
