import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export function useFetch(id) {
  const dbRef = collection(db, "curve");
  const [dataCurves, setDataCurves] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCurves = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(dbRef);

      if (querySnapshot.empty) {
        setError(true);
        setLoading(false);
        return;
      }

      const data = await querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (id) {
        const curveById = data.find((item) => item.id === id);
        setLoading(false);
        return setDataCurves(curveById);
      }

      const inOrder = data.sort((a, b) => a.team.localeCompare(b.team));
      setDataCurves(inOrder);
      setLoading(false);
    };
    fetchCurves();
  }, [id]);

  return { dataCurves, loading, error, setDataCurves };
}
