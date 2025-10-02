import "./Manager.css";
import { useState, useContext, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Navbar from "../ui/Navbar";
import Loader from "../elements/Loader";
import { MdFilterListAlt } from "react-icons/md";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { WarningsBanner } from "../ui/WarningsBanner";

import Button from "../elements/Button";
import useFetch from "../../hooks/useFetch";
import { warningStates } from "../ui/WarningsBanner";

const Manager = () => {
  const { dataCurves, loading, error, setDataCurves } = useFetch();
  const [warningBanner, setWarningBanner] = useState(false);
  const [warningState, setWarningState] = useState(warningStates.default);
  const [curveToDelete, setCurveToDelete] = useState(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    console.log("Curve to delete:", curveToDelete);
  }, [curveToDelete]);


  const openWarningBanner = (curve) => {
    setCurveToDelete(curve);
    setWarningBanner(true);
  };

  const closeWarningBanner = () => {
    setWarningBanner(false);
    setCurveToDelete(null);
    setWarningState(warningStates.default);
  }

  const removeCurve = async (curve) => {
    if (!curve) {
      setWarningBanner(false);
      setCurveToDelete(null);
      return;
    }
    const resOfDelete = await deleteDoc(doc(db, "curve", curve.id));
    setDataCurves(dataCurves.filter((item) => item.id !== curve.id));
    setWarningState(warningStates.success);
    setCurveToDelete(null);
    console.log("Deleted curve:", curve, resOfDelete);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
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

  return (
    <>
      <Navbar />
      {warningBanner && (
        <WarningsBanner
          className={warningState.className}
          label={warningState.text}
          buttonsText={warningState.buttonsText}
          onCancel={() => closeWarningBanner()}
          onConfirm={() => removeCurve(curveToDelete)}
        />
      )}
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
                    <div key={curve.id} className="row-content">
                      <span>{curve.city}</span>
                      <span>{curve.team}</span>
                      <span>{curve.league}</span>
                      <span>{curve.main_group}</span>
                      <span
                        className="remove-icon"
                        onClick={() => openWarningBanner(curve)}
                      >
                        <span>
                          <IoMdRemoveCircleOutline />
                        </span>
                      </span>
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
