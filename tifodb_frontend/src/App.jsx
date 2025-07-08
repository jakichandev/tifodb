import "./index.css";
import "./App.css";
import "./components/pages/Homepage.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./components/pages/Homepage.jsx";
import DataPage from "./components/pages/DataPage.jsx";
import AuthPage from "./components/pages/AuthPage.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase.js";
import { AuthContext } from "./contexts/AuthContext.js";
import Manager from "./components/pages/Manager.jsx";
function App() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user.email);
        console.log("User is signed in:", user.email);
      } else {
        console.log("No user is signed in.");
      }
    });
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
    <AuthContext.Provider value={userInfo}>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/list" element={<DataPage />}></Route>
        <Route path="/manager" element={<Manager />}></Route>
        <Route path="/signin" element={<AuthPage />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
