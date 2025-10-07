import { Link } from "react-router-dom";
import Button from "../elements/Button";
import { MdFilterListAlt } from "react-icons/md";

export const ManagerNav = () => {
  return (
    <nav className="manager-navbar">
      <Link to={"/manager/add"}>
        <Button
          content={"+ Aggiungi"}
          className={"btn-primary"}
          txtCol={"var(--color-important)"}
          borderColor={"var(--color-important)"}
        ></Button>
      </Link>

      {/*  <div className="filter-btn">
        <MdFilterListAlt></MdFilterListAlt>
        <span>Filtri</span>
      </div>
      <div className="filter-wrapper">
        <div className="league">
          <select name="filter" id="filter-select"></select>
        </div>
      </div> */}
    </nav>
  );
};
