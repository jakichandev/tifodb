import "./Manager.css";
import Navbar from "../ui/Navbar";
import Loader from "../elements/Loader";
import { MdFilterListAlt } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import Button from "../elements/Button";
import useFetch from "../../hooks/useFetch";
const Manager = () => {
  const { dataCurves, loading, error } = useFetch();
  const user = useContext(AuthContext);
  if (user) {
    return (
      <>
        <Navbar />
        <section className="manager">
          <div className="wrapper">
            <nav className="manager-navbar">
              <Link to={"/manager/add"}>
                <Button content={"Aggiungi"} className={"btn-primary"}></Button>
              </Link>

              <div className="filter-btn">
                <MdFilterListAlt></MdFilterListAlt>
                <span>Filtri</span>
              </div>
              <div className="filter-wrapper">
                <div className="league">
                  <select name="filter" id="filter-select">
                    <option value="Serie A">Serie A</option>
                    <option value="Serie B">Serie B</option>
                    <option value="Serie C">Serie C</option>
                    <option value="Serie D">Serie D</option>
                  </select>
                </div>
              </div>
            </nav>
            <div className="list-curves">
              <ul>
                {dataCurves.map((curve) => (
                  <li className="row-curve">
                    {loading ? (
                      <Loader />
                    ) : (
                      <div className="row-content">
                        <span>{curve.city}</span>
                        <span>{curve.team}</span>
                        <span>{curve.division}</span>
                        <span>{curve.sport}</span>
                        <span>{curve.main_group}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <section className="manager">
          <div className="wrapper">
            <p> Non sei loggato, non puoi accedere al manager</p>
          </div>
        </section>
      </>
    );
  }
};

export default Manager;

/* <form>
          <div>
            <label htmlFor="team">Team</label>
            <input type="text" name="team" id="team" />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" />
          </div>
          <div>
            <label htmlFor="actual_groups">Gruppi attuali</label>
            <input type="text" name="actual_groups" id="actual_groups" />
            <button>Aggiungi gruppo</button>
          </div>
        </form> */
