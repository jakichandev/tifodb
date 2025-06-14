import "./index.css";
import "./App.css";
import Navbar from "./components/ui/Navbar.jsx";
import Hero from "./components/ui/Hero.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
      <Navbar />
      <Hero />
      <Routes></Routes>
    </>
  );
}

export default App;
