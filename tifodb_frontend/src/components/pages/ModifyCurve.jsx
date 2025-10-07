import Navbar from "../ui/Navbar";
import "./Manager.css";
import { Form } from "../ui/Form";
import { ManagerNav } from "../ui/ManagerNav";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loader from "../elements/Loader";
import { Footer } from "../ui/Footer";

export const ModifyCurve = () => {
  const { id } = useParams();
  const { dataCurves, loading, setDataCurves } = useFetch(id);


  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <section className="manager-add p-wrapper">
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
      <Footer />
    </>
  );
};
