import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ListFormField from "../elements/ListFormField";
import { useEffect, useState } from "react";
import Loader from "../elements/Loader";

const Input = ({ type, groupData, id, name, prop, setNewGroup }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      onChange={(e) =>
        setNewGroup({
          ...groupData,
          [prop]: e.target.value,
        })
      }
      value={groupData[prop] ? groupData[prop] : ""}
    ></input>
  );
};

export const Form = ({ setNewGroup, groupData, mode, setError }) => {
  useEffect(() => {
    setNewGroup(groupData);
  }, [groupData, setNewGroup]);
  const [loading, setLoading] = useState(false);

  const saveData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fbDoc = doc(db, "curve", groupData.team.toLowerCase());
    const {
      team,
      city,
      actual_groups,
      legendary_groups,
      nation,
      friendships,
      rivalries,
      main_group,
      stadium,
    } = groupData;
    const payload = {
      team,
      city,
      actual_groups,
      legendary_groups,
      nation,
      friendships,
      rivalries,
      main_group,
      stadium,
    };

    if (
      !groupData.team ||
      !groupData.city ||
      !groupData.nation ||
      !groupData.league ||
      !groupData.stadium
    ) {
      setError({
        status: true,
        type: "ERROR_SAVING_DATA",
        message:
          "Problema nel salvataggio dei dati, controlla di aver inserito correttamente i valori!",
      });
      return setLoading(false);
    }

    if (mode === "ADD") {
      await setDoc(fbDoc, payload);
    } else {
      try {
        await updateDoc(fbDoc, payload);
      } catch (error) {
        console.log("error: " + error);
      }
    }

    setLoading(false);
  };

  const removeItem = (i, prop) => {
    setNewGroup({
      ...groupData,
      [prop]: groupData[prop].filter((val, index) => index != i),
    });
  };

  const [previews, setPreviews] = useState({
    actual_groups: undefined,
    legendary_groups: undefined,
    friendships: undefined,
    rivalries: undefined,
  });

  const addGroupList = (group, event, property, input) => {
    event.preventDefault();
    if (!group || group.length < 2) {
      return setError({
        status: true,
        type: "NOT_VALID_ACTUAL_GROUP",
        message: "Gruppo non valido!",
      });
    }
    setNewGroup({
      ...groupData,
      [property]: [...groupData[`${property}`], group],
    });
    setError({
      status: false,
      type: "NONE",
      message: "Dati inseriti validamente.",
    });
    setPreviews({ ...previews, [property]: "" });
    input.value = "";
  };

  return (
    <form className="add-curve-form">
      {loading && <Loader />}
      <div>
        <label htmlFor="team">Team *</label>
        <Input
          id={"team"}
          name={"team"}
          type={"text"}
          groupData={groupData}
          setNewGroup={setNewGroup}
          prop={"team"}
        />
      </div>

      <div>
        <label htmlFor="city">Città *</label>
        <Input
          id={"city"}
          name={"city"}
          type={"text"}
          groupData={groupData}
          setNewGroup={setNewGroup}
          prop={"city"}
        />
      </div>

      <ListFormField
        name={"actual_groups"}
        newGroup={groupData}
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
            setNewGroup({ ...groupData, main_group: e.target.value })
          }
        >
          <option>Seleziona il gruppo principale</option>
          {groupData?.actual_groups?.map((group) => (
            <option>{group}</option>
          ))}
        </select>
      </div>

      <ListFormField
        name={"legendary_groups"}
        newGroup={groupData}
        addGroupList={addGroupList}
        removeItem={removeItem}
        placeholder={"Inserisci i gruppi storici della tifoseria..."}
        previews={previews}
        setPreviews={setPreviews}
        label={"Gruppi storici"}
      />
      <ListFormField
        name={"friendships"}
        newGroup={groupData}
        addGroupList={addGroupList}
        removeItem={removeItem}
        placeholder={"Inserisci le tifoserie gemellate..."}
        previews={previews}
        setPreviews={setPreviews}
        label={"Gemellaggi"}
      />
      <ListFormField
        name={"rivalries"}
        newGroup={groupData}
        addGroupList={addGroupList}
        removeItem={removeItem}
        placeholder={"Inserisci le tifoserie Rivali..."}
        previews={previews}
        setPreviews={setPreviews}
        label={"Rivalità"}
      />

      <div className="stadium-field">
        <label htmlFor="stadium">Stadio *</label>
        <Input
          id={"stadium"}
          name={"stadium"}
          type={"text"}
          groupData={groupData}
          setNewGroup={setNewGroup}
          prop={"stadium"}
        />
      </div>

      <div className="nation-field">
        <label htmlFor="nation">Nazione *</label>
        <Input
          id={"nation"}
          name={"nation"}
          type={"text"}
          groupData={groupData}
          setNewGroup={setNewGroup}
          prop={"nation"}
        />
      </div>

      <div className="league-field">
        <label htmlFor="league">Campionato *</label>
        <Input
          id={"league"}
          name={"league"}
          type={"text"}
          groupData={groupData}
          setNewGroup={setNewGroup}
          prop={"league"}
        />
      </div>
      <input
        onClick={(e) => saveData(e)}
        type="submit"
        value={"Pubblica"}
        className="btn-primary"
      />
    </form>
  );
};
