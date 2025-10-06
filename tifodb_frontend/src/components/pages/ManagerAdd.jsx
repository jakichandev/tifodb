import Navbar from "../ui/Navbar";
import { Form } from "../ui/Form";
import Loader from "../elements/Loader";
import "./Manager.css";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useState, useContext } from "react";

const ManagerAdd = () => {
  const user = useContext(AuthContext);

  const [newGroup, setNewGroup] = useState({
    team: undefined,
    city: undefined,
    actual_groups: [],
    main_group: undefined,
    legendary_groups: [],
    friendships: [],
    rivalries: [],
    stadium: "",
    nation: "",
    league: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    status: false,
    type: "NONE",
    message: "Nessun Errore",
  });


  
 
  if (!auth || !user) {
    return (
      <>
        <Navbar />
        <section className="manager-add">
          <div className="wrapper">
            <p>Non sei loggato... Non puoi accedere a questa pagina</p>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <section className="manager-add">
        <div className="wrapper">
          {loading && <Loader />}
          <nav>
            <Link to={"/manager"}>
              <IoChevronBack />
              <span>BACK</span>
            </Link>
            <h4 className="h3">Aggiungi una tifoseria</h4>
          </nav>
          <Form
            setNewGroup={setNewGroup}
            groupData={newGroup}
            mode="ADD"
            setError={setError}
          />
        </div>
      </section>
    </>
  );
};

export default ManagerAdd;
