import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../elements/Logo";
import Button from "../elements/Button";
import "../../index.css";
import "./Navbar.css";
import { MdListAlt } from "react-icons/md";
import { MdOutlineStadium } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

const Navbar = () => {
  const [active, setActive] = useState(false);
  return (
    <header>
      <Logo width={140} height={"auto"} />
      <nav className={active ? "active" : ""}>
        <ul>
          <li>
            <Link to={"/history"}>
              <MdOutlineStadium />
              <span>Storia del movimento</span>
            </Link>
          </li>
          <li>
            <Link to={"/list"}>
              <MdListAlt />
              <span>Italia</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Button
        content={"Collabora con noi!"}
        className={active ? "btn-primary visible" : "btn-primary"}
      ></Button>
      <CiMenuKebab
        className={active ? "active" : ""}
        onClick={() => {
          setActive(!active);
        }}
      />
    </header>
  );
};

export default Navbar;
