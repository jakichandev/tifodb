import Navbar from "../ui/Navbar";
import "../elements/DataTable.css";
import Loader from "../elements/Loader";
import {useFetch} from "../../hooks/useFetch";

const DataPage = () => {
  const { dataCurves, loading } = useFetch();
  return (
    <>
      <Navbar />
      <div className="table-container">
        {loading && <Loader />}
        <table className="fans-table" role="table">
          <thead>
            <tr>
              <th>
                <h4>Squadra</h4>
              </th>
              <th>
                <h4>Città</h4>
              </th>
              <th>
                <h4>Gruppi attivi</h4>
              </th>
              <th>
                <h4>Gruppo principale</h4>
              </th>
              <th>
                <h4>Gruppi storici</h4>
              </th>
              <th>
                <h4>Gemellaggi</h4>
              </th>
              <th>
                <h4>Rivalità</h4>
              </th>
              <th>
                <h4>Stadio</h4>
              </th>
            </tr>
          </thead>

          <tbody>
            {dataCurves?.map((curva) => (
              <tr key={curva.team}>
                <td>{curva.team}</td>
                <td>{curva.city}</td>
                <td>
                  <ol className="list-table">
                    {curva.actual_groups.map((group, index) => (
                      <li key={index}>{group}</li>
                    ))}
                  </ol>
                </td>
                <td>{curva.main_group}</td>
                <td>
                  <ol className="list-table">
                    {curva.legendary_groups.map((group, index) => (
                      <li key={index}>{group}</li>
                    ))}
                  </ol>
                </td>
                <td>
                  <ol className="list-table">
                    {curva.friendships.map((group, index) => (
                      <li key={index}>{group}</li>
                    ))}
                  </ol>
                </td>
                <td>
                  <ol className="list-table">
                    {curva.rivalries.map((group, index) => (
                      <li key={index}>{group}</li>
                    ))}
                  </ol>
                </td>
                <td>{curva.stadium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataPage;
