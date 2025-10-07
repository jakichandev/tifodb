import "./Manager.css";
import { useState, useContext, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Navbar from "../ui/Navbar";
import Loader from "../elements/Loader";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { WarningsBanner } from "../ui/WarningsBanner";
import Button from "../elements/Button";
import { useFetch } from "../../hooks/useFetch";
import { warningStates } from "../ui/WarningsBanner";
import { useNavigate } from "react-router-dom";
import { ManagerNav } from "../ui/ManagerNav";
import {Footer} from "../ui/Footer"

const Manager = () => {
  const { dataCurves, loading, error, setDataCurves } = useFetch();
  const [warningBanner, setWarningBanner] = useState(false);
  const [warningState, setWarningState] = useState(warningStates.default);
  const [curveToDelete, setCurveToDelete] = useState(null);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

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
  };

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
      <section className="manager p-wrapper">
        <div className="wrapper">
          <ManagerNav />
          <div className="list-curves">
            <ul>
              {dataCurves?.map((curve) => (
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
                        <IoMdRemoveCircleOutline />
                      </span>
                      <span
                        onClick={() => navigate(`/manager/modify/${curve.id}`)}
                        className="modify-icon"
                      >
                        <FaPencilAlt />
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
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
