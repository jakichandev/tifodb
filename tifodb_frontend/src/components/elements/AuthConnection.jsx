import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const AuthConnection = () => {
  const user = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (user) {
    return (
      <div className="auth-connection">
        <span className="auth-connection-text">
          Connesso come <strong>{user}</strong>
        </span>
        <IoIosArrowDown className="auth-connection-icon" />
        <div className="options-auth-wrapper">
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
