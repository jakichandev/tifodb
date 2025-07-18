import Navbar from "../ui/Navbar";
import StatusBanner from "../elements/StatusBanner";
import ListFormField from "../elements/ListFormField";
import "./Manager.css";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";

const ManagerAdd = () => {
  const [newGroup, setNewGroup] = useState({
    team: undefined,
    city: undefined,
    actual_groups: [],
    historical_groups: [],
    friendships: [],
    rivalries: [],
    stadium: "",
  });
  const [previews, setPreviews] = useState({
    actual_groups: undefined,
    historical_groups: undefined,
    friendships: undefined,
    rivalries: undefined,
  });
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
      [prop]: newGroup.actual_groups.filter((val, index) => index != i),
    });
  };
  return (
    <>
      <StatusBanner error={error} />
      <Navbar></Navbar>
      <section className="manager-add">
        <div className="wrapper">
          <nav>
            <Link to={"/manager"}>
              <IoChevronBack />
              <span>BACK</span>
            </Link>
          </nav>
          <h4 className="h3">Aggiungi una tifoseria</h4>
          <form className="add-curve-form">
            <div>
              <label htmlFor="team">Team</label>
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
              <label htmlFor="city">City</label>
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
              <select>
                {newGroup.actual_groups.map((group) => (
                  <option>{group}</option>
                ))}
              </select>
            </div>

            <ListFormField
              name={"historical_groups"}
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
              <label htmlFor="stadium">Stadio</label>
              <input
                onChange={(e) =>
                  setNewGroup({ ...newGroup, stadium: e.target.value })
                }
                type="text"
                name="stadium"
                id="stadium"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ManagerAdd;
