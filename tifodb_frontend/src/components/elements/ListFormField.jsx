import { CiCircleRemove } from "react-icons/ci";
import { useRef } from "react";

const ListFormField = ({
  name,
  newGroup,
  previews,
  setPreviews,
  addGroupList,
  removeItem,
  placeholder,
  label,
}) => {
  const inputRef = useRef();
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        ref={inputRef}
        onChange={(e) => setPreviews({ [name]: e.target.value })}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
      />
      <button
        onClick={(e) => addGroupList(previews[name], e, name, inputRef.current)}
        className="btn-primary add-actual-group"
      >
        Aggiungi gruppo
      </button>

      <ul className="list-added-groups">
        {newGroup[name].map((groupAdded, i) => (
          <li key={i}>
            <span style={{ color: "black" }}>{groupAdded}</span>
            <span>
              <CiCircleRemove
                style={{ color: "black" }}
                onClick={() => removeItem(i, name)}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListFormField;
