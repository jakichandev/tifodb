import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ListFormField from "../elements/ListFormField";
import { useEffect, useState } from "react";
import Loader from "../elements/Loader";

const statusType = {
  MISSING_DATA: {
    message: "Uno o più dati mancanti, controlla prima di proseguire!",
    label: "Dati mancanti",
    className: "error",
  },
  NOT_VALID_ARR_DATA: {
    message: "Impossibile inserire nella lista questo dato",
    label: "Non valido",
    className: "error",
  },
  NOT_ERROR_ARR_DATA: {
    message: "",
    label: "Dato inserito correttamente",
    className: "valid",
  },
  NOT_ERROR_FORM: {
    message: "",
    label: "",
    className: "",
  },
  DATA_ADDED: {
    message: "I dati sono stati aggiornati",
    label: "Dati Aggiornati",
    className: "valid",
  },
};

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

export const Form = ({ setNewGroup, groupData, mode }) => {
  useEffect(() => {
    setNewGroup(groupData);
  }, [groupData, setNewGroup]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    status: false,
    type: statusType["NOT_ERROR_FORM"],
  });

  const [previews, setPreviews] = useState({
    actual_groups: undefined,
    legendary_groups: undefined,
    friendships: undefined,
    rivalries: undefined,
  });

  const checkAndConfirmSave = async (fnSaveData, firebaseDoc, payload) => {
    try {
      await fnSaveData(firebaseDoc, payload);
      setError({
        status: false,
        type: statusType["DATA_ADDED"]
      })
    } catch (error) {
      console.log(error);
      return setError({
        status: true,
        type: statusType["DB_ERROR"],
      });
    }
  };

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
      league,
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
      league,
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
        type: statusType["MISSING_DATA"],
      });
      return setLoading(false);
    }

    if (mode === "ADD") checkAndConfirmSave(setDoc, fbDoc, payload);
    else checkAndConfirmSave(updateDoc, fbDoc, payload);

    setLoading(false);
  };

  const removeItem = (i, prop) => {
    setNewGroup({
      ...groupData,
      [prop]: groupData[prop].filter((val, index) => index != i),
    });
  };

  const addGroupList = (group, event, property, input) => {
    event.preventDefault();
    if (!group || group.length < 2) {
      return setError({
        status: true,
        type: statusType["NOT_VALID_ARR_DATA"],
      });
    }
    setNewGroup({
      ...groupData,
      [property]: [...groupData[`${property}`], group],
    });

    setError({
      status: false,
      type: statusType["NOT_ERROR_ARR_DATA"],
    });

    setPreviews({ ...previews, [property]: "" });
    input.value = "";
  };

  return (
    <form className="add-curve-form">
      {loading && <Loader />}
      <div className="form-status">
        <label>{error.type.label}</label>
        <p>{error.type.message}</p>
      </div>
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
