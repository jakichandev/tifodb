import { CiCircleRemove } from "react-icons/ci";

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
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={(e) => setPreviews({ [name]: e.target.value })}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
      />
      <button
        onClick={(e) => addGroupList(previews[name], e, name)}
        className="btn-primary add-actual-group"
      >
        Aggiungi gruppo
      </button>

      <ul className="list-added-groups">
        {newGroup[name].map((groupAdded, i) => (
          <li key={i}>
            <span>{groupAdded}</span>
            <span>
              <CiCircleRemove onClick={() => removeItem(i, name)} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListFormField;
