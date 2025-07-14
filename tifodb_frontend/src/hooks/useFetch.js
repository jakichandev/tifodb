import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function useFetch() {
  const dbRef = collection(db, "curve");
  const [dataCurves, setDataCurves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCurves = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(dbRef);
        const data = await querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched data:", data);
        setDataCurves(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };
    fetchCurves();
  }, []);

  console.log(dataCurves);
  return { dataCurves, loading, error };
}
