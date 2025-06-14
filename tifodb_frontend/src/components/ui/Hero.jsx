import "./Hero.css";
import { IoSearchOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <section className="hero">
      <div className="content">
        <h2 className="h2">Tutto sulle curve calcistiche italiane</h2>
        <h4 className="h4">
          dalle rivalità ai gemellaggi fino alle informazioni sui gruppi e le
          loro storie, un database completo per gli appassionati del tifo
        </h4>
        <div className="search-wrapper">
          <input
            type="text"
            name="search"
            className="search"
            id=""
            placeholder={
              navigator.userAgent.includes("Mac")
                ? "Cerca una tifoseria | ⌘ + K"
                : "Cerca una tifoseria | Ctrl + K"
            }
          />
          <div className="submit-wrapper">
            <button className="submit" type="submit">
              <IoSearchOutline className="search-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
