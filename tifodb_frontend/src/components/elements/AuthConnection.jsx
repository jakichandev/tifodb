import { useState } from "react";
import { auth } from "../../config/firebase";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Popover = ({ isOpen, setIsOpen, authenticated, children }) => {
  return (
    <div className="auth-connection">
      <IoIosArrowDown
        onClick={() => setIsOpen(!isOpen)}
        className="auth-connection-icon"
        style={{
          transform: isOpen ? "rotate(-180deg)" : "none",
        }}
      />
      {authenticated && <span></span>}
      <div
        className={
          isOpen ? "options-auth-wrapper open" : "options-auth-wrapper"
        }
      >
        <ul className="options-auth">{children}</ul>
      </div>
    </div>
  );
};

const AuthConnection = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!auth.currentUser)
    return (
      <Popover isOpen={isOpen} setIsOpen={setIsOpen} authenticated={false}>
        <li>
          <Link to={"/signin"}>Login</Link>
        </li>
      </Popover>
    );

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen} authenticated={true}>
      <li>
        <Link to="/manager">Manager</Link>
      </li>
      <li>
        <Link to="/signout">Esci</Link>
      </li>
    </Popover>
  );
};

export default AuthConnection;
