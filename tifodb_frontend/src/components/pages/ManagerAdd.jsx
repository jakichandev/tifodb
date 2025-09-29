import Navbar from "../ui/Navbar";
import StatusBanner from "../elements/StatusBanner";
import ListFormField from "../elements/ListFormField";
import Loader from "../elements/Loader";
import "./Manager.css";
import { AuthContext } from "../../contexts/AuthContext";
import { db, auth } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useEffect, useState, useContext } from "react";
import { CiCircleRemove } from "react-icons/ci";

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

  const [previews, setPreviews] = useState({
    actual_groups: undefined,
    legendary_groups: undefined,
    friendships: undefined,
    rivalries: undefined,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    status: false,
    type: "NONE",
    message: "Nessun Errore",
  });

  useEffect(() => {
    console.log(newGroup);
    console.log(previews);
  }, [newGroup, previews]);

  const addGroupList = (group, event, property) => {
    event.preventDefault();
    if (!group || group.length < 2) {
      setError({
        status: true,
        type: "NOT_VALID_ACTUAL_GROUP",
        message: "Gruppo non valido!",
      });
      console.log(group);
      return;
    }
    setNewGroup({
      ...newGroup,
      [property]: [...newGroup[`${property}`], group],
    });
    setError({
      status: false,
      type: "NONE",
      message: "Dati inseriti validamente.",
    });
  };

  const removeItem = (i, prop) => {
    setNewGroup({
      ...newGroup,
      [prop]: newGroup[prop].filter((val, index) => index != i),
    });
  };

  const addData = async (
    e,
    {
      team,
      city,
      actual_groups,
      legendary_groups,
      friendships,
      rivalries,
      stadium,
      nation,
      league,
      main_group,
    }
  ) => {
    e.preventDefault();
    setLoading(true);
    if (!team || !city || !nation || !league || !stadium) {
      setError({
        status: true,
        type: "ERROR_SAVING_DATA",
        message:
          "Problema nel salvataggio dei dati, controlla di aver inserito correttamente i valori!",
      });
      setLoading(false);
      return;
    }
    await setDoc(doc(db, "curve", team), {
      team: team,
      city: city,
      actual_groups: actual_groups,
      legendary_groups: legendary_groups,
      main_group: main_group,
      friendships: friendships,
      rivalries: rivalries,
      stadium: stadium,
      nation: nation,
      league: league,
    });
    await setLoading(false);
  };

  if (!auth || !user) {
    return (
      <>
        <Navbar></Navbar>
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
      <StatusBanner error={error} />
      <Navbar></Navbar>
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

          <form className="add-curve-form">
            <div>
              <label htmlFor="team">Team *</label>
              <input
                onChange={(e) =>
                  setNewGroup({ ...newGroup, team: e.target.value })
                }
                type="text"
                name="team"
                id="team"
              />
            </div>

            <div>
              <label htmlFor="city">Città *</label>
              <input
                onChange={(e) =>
                  setNewGroup({ ...newGroup, city: e.target.value })
                }
                type="text"
                name="city"
                id="city"
              />
            </div>

            <ListFormField
              name={"actual_groups"}
              newGroup={newGroup}
              addGroupList={addGroupList}
              removeItem={removeItem}
              placeholder={"Inserisci i gruppi attuali della curva..."}
              previews={previews}
              setPreviews={setPreviews}
              label={"Gruppi attuali"}
            />

            <div>
              <label htmlFor="main_group">Gruppo principale</label>
              <select
                onChange={(e) =>
                  setNewGroup({ ...newGroup, main_group: e.target.value })
                }
              >
                {newGroup.actual_groups.map((group) => (
                  <option>{group}</option>
                ))}
              </select>
            </div>

            <ListFormField
              name={"legendary_groups"}
              newGroup={newGroup}
              addGroupList={addGroupList}
              removeItem={removeItem}
              placeholder={"Inserisci i gruppi storici della tifoseria..."}
              previews={previews}
              setPreviews={setPreviews}
              label={"Gruppi storici"}
            />
            <ListFormField
              name={"friendships"}
              newGroup={newGroup}
              addGroupList={addGroupList}
              removeItem={removeItem}
              placeholder={"Inserisci le tifoserie gemellate..."}
              previews={previews}
              setPreviews={setPreviews}
              label={"Gemellaggi"}
            />
            <ListFormField
              name={"rivalries"}
              newGroup={newGroup}
              addGroupList={addGroupList}
              removeItem={removeItem}
              placeholder={"Inserisci le tifoserie Rivali..."}
              previews={previews}
              setPreviews={setPreviews}
              label={"Rivalità"}
            />

            <div className="stadium-field">
              <label htmlFor="stadium">Stadio *</label>
              <input
                onChange={(e) =>
                  setNewGroup({ ...newGroup, stadium: e.target.value })
                }
                type="text"
                name="stadium"
                id="stadium"
              />
            </div>

            <div className="nation-field">
              <label htmlFor="nation">Nazione *</label>
              <input
                onChange={(e) =>
                  setNewGroup({ ...newGroup, nation: e.target.value })
                }
                type="text"
                name="nation"
                id="nation"
              />
            </div>

            <div className="league-field">
              <label htmlFor="league">Campionato *</label>
              <input
                onChange={(e) =>
                  setNewGroup({ ...newGroup, league: e.target.value })
                }
                type="text"
                name="league"
                id="league"
              />
            </div>
            <input
              onClick={(e) => addData(e, newGroup)}
              type="submit"
              value={"Pubblica"}
              className="btn-primary"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default ManagerAdd;
