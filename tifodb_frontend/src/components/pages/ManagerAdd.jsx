import Navbar from "../ui/Navbar";
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
  });
  const [previews, setPreviews] = useState({
    actual_groups: undefined,
  });
  const [error, setError] = useState({
    status: false,
    type: "NONE",
    message: "NOT ERROR",
  });
  useEffect(() => {
    console.log(newGroup);
    console.log(previews);
  }, [newGroup, previews]);

  const addActualGroup = (group, event) => {
    event.preventDefault();
    if (!group || !group.length > 2) {
      setError({
        status: true,
        type: "NOT_VALID_ACTUAL_GROUP",
        message: "Gruppo attuale non valido!",
      });
      console.log(group);
      return;
    }
    const result = setNewGroup({
      ...newGroup,
      actual_groups: [...newGroup.actual_groups, group],
    });
    console.log(result);
  };

  const removeItem = (i) => {
    setNewGroup({
      ...newGroup,
      actual_groups: newGroup.actual_groups.filter((val, index) => index != i),
    });
  };
  return (
    <>
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
            <div>
              <label htmlFor="actual_groups">Gruppi attuali</label>
              <input
                onChange={(e) => setPreviews({ actual_groups: e.target.value })}
                type="text"
                name="actual_groups"
                id="actual_groups"
              />
              <button
                onClick={(e) => addActualGroup(previews.actual_groups, e)}
                className="btn-primary add-actual-group"
              >
                Aggiungi gruppo
              </button>
              <ul className="list-added-groups">
                {newGroup.actual_groups.map((groupAdded, i) => (
                  <li key={i}>
                    <span>{groupAdded}</span>
                    <span>
                      <CiCircleRemove onClick={() => removeItem(i)} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ManagerAdd;
