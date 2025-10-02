import { useParams } from "react-router-dom";
import Loader from "../elements/Loader";
import { useFetch } from "../../hooks/useFetch";
import Navbar from "../ui/Navbar";
import "./SingleCurve.css";
import { PiCityThin, PiRanking } from "react-icons/pi";
import { TbBuildingStadium } from "react-icons/tb";

const ListField = ({ label, field }) => (
  <div>
    <h4>{label}</h4>
    <ol>
      {field?.map((category, index) => (
        <li key={index}>
          <span>{category}</span>
        </li>
      ))}
    </ol>
  </div>
);

export const SingleCurve = () => {
  const { id } = useParams();
  const { dataCurves, loading, error } = useFetch(id);

  if (!dataCurves || dataCurves === undefined) {
    return (
      <>
        <Navbar />
        <section className="single-curve">
          {loading ?? <Loader />}
          <div className="wrapper">
            <h3>Curva non trovata</h3>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="single-curve">
        <div className="wrapper">
          {loading && <Loader />}
          {!dataCurves || (error && <h2>Si è verificato un errore</h2>)}
          <div className="header">
            <div>
              <h1>
                <span></span>
                {dataCurves?.team}
              </h1>
            </div>
            <div>
              <h3>
                <span>
                  <PiRanking />
                </span>
                {dataCurves?.league}
              </h3>
              <h3>
                <span>
                  <TbBuildingStadium />
                </span>
                {dataCurves?.stadium}
              </h3>
              <h3>
                <span>
                  <PiCityThin />
                </span>
                {dataCurves?.city}
              </h3>
            </div>
          </div>

          <div>
            <h4>Curva</h4>
            <span>{dataCurves?.main_name}</span>
          </div>

          <ListField label="Gruppi Attuali" field={dataCurves?.actual_groups} />
          <ListField
            label="Gruppi Storici"
            field={dataCurves?.legendary_groups}
          />
          <div>
            <h4>Gruppo principale</h4>
            <span>{dataCurves?.main_group}</span>
          </div>
          <ListField label="Rivalità" field={dataCurves?.rivalries} />
          <ListField
            label="Gemellaggi e Amicizie"
            field={dataCurves?.friendships}
          />
        </div>
      </section>
    </>
  );
};
