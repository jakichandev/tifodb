import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../elements/Loader";
import { useFetch } from "../../hooks/useFetch";
import Navbar from "../ui/Navbar";

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
  useEffect(() => {
    console.log("Fetched curve data:", dataCurves);
  }, [dataCurves]);
  return (
    <>
      <Navbar />
      <section>
        <div className="wrapper">
          {loading && <Loader />}
          {!dataCurves || (error && <h2>Si è verificato un errore</h2>)}
          <h1>{dataCurves?.team}</h1>
          <h3>{dataCurves?.city}</h3>
          <h3>{dataCurves?.league}</h3>
          <h3>{dataCurves?.stadium}</h3>

          <ListField label="Gruppi Attuali" field={dataCurves?.actual_groups} />
          <ListField label="Rivalità" field={dataCurves?.rivalries} />
        </div>
      </section>
    </>
  );
};
