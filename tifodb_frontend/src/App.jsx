import "./index.css";
import "./App.css";
import "./components/pages/Homepage.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Homepage from "./components/pages/Homepage.jsx";
import DataPage from "./components/pages/DataPage.jsx";
import AddCurves from "./components/pages/AddCurves.jsx";
import AuthPage from "./components/pages/AuthPage.jsx";
function App() {
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (
        (event.metaKey && event.key === "k") ||
        (event.ctrlKey && event.key === "k")
      ) {
        event.preventDefault();
        const searchInput = document.querySelector("input.search");
        if (searchInput) {
          searchInput.focus();
        }
      }
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/list" element={<DataPage />}></Route>
        <Route path="/add" element={<AddCurves />}></Route>
        <Route path="/signin" element={<AuthPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
