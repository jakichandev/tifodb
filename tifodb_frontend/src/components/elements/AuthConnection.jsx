import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const AuthConnection = () => {
  const user = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  if (user) {
    return (
      <div className="auth-connection">
        <span className="auth-connection-text">
          Connesso come <strong>{user}</strong>
        </span>
        <IoIosArrowDown
          onClick={() => setIsOpen(!isOpen)}
          className="auth-connection-icon"
          style={{
            transform: isOpen ? "rotate(-180deg)" : "none",
          }}
        />
        <div
          className={
            isOpen ? "options-auth-wrapper open" : "options-auth-wrapper"
          }
        >
          <ul className="options-auth">
            <li>
              <Link to="/manager">Manager</Link>
            </li>
            <li>
              <Link to="/profile">Profilo</Link>
            </li>
            <li>
              <Link to="/signout">Esci</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default AuthConnection;
