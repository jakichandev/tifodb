import Navbar from "../ui/Navbar";
import "./Manager.css";
import { Form } from "../ui/Form";
import { ManagerNav } from "../ui/ManagerNav";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loader from "../elements/Loader";

export const ModifyCurve = () => {
  const { id } = useParams();
  const { dataCurves, loading, setDataCurves } = useFetch(id);

  useEffect(() => {
    console.log(dataCurves);
  }, [dataCurves, id]);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <section className="manager-add">
        <div className="wrapper">
          <nav>
            <Link to={"/manager"}>
              <IoChevronBack />
              <span>BACK</span>
            </Link>
            <h4 className="h3">Modifica la tifoseria</h4>
          </nav>
          {loading && <Loader />}
          {dataCurves && (
            <Form
              mode="MOD"
              setNewGroup={setDataCurves}
              groupData={dataCurves}
            />
          )}
        </div>
      </section>
    </>
  );
};
