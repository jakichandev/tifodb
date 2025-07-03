import { useState } from "react";
import Navbar from "../ui/Navbar";
const AddCurves = () => {
  const [curva, setCurva] = useState({
    team: "",
    city: "",
    actual_groups: [],
    main_group: "",
    historical_groups: [],
    friendships: [],
    rivalries: [],
    stadium: "",
  });
  return (
    <>
      <Navbar />
      <section className="add-curves">
        <form>
          <div>
            <label htmlFor="team">Team</label>
            <input type="text" name="team" id="team" />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" />
          </div>
          <div>
            <label htmlFor="actual_groups">Gruppi attuali</label>
            <input type="text" name="actual_groups" id="actual_groups" />
            <button>Aggiungi gruppo</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddCurves;
