import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../elements/Logo";
import Button from "../elements/Button";
import "../../index.css";
import "./Navbar.css";
import { MdListAlt } from "react-icons/md";
import { MdOutlineStadium } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import AuthConnection from "../elements/AuthConnection";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();

  return (
    <header>
      <Link to={"/"} className="logo-link">
        <Logo width={120} height={"auto"} />
      </Link>

      <nav className={active ? "active" : ""}>
        <ul>
          {/* <li>
            <Link
              to={"/history"}
              className={location.pathname === "/history" ? "current" : ""}
            >
              <MdOutlineStadium />
              <span>Storia del movimento</span>
            </Link>
          </li> */}
          <li>
            <Link
              to={"/list"}
              className={location.pathname === "/list" ? "current" : ""}
            >
              <MdListAlt />
              <span className={location.pathname === "/list" ? "current" : ""}>Italia</span>
            </Link>
          </li>
        </ul>
      </nav>

      <AuthConnection />

      <CiMenuKebab
        className={active ? "menu-icon active" : "menu-icon"}
        onClick={() => {
          setActive(!active);
        }}
      />
    </header>
  );
};

export default Navbar;
