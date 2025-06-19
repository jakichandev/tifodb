import "./Hero.css";
import "../elements/SearchBar";
import SearchBar from "../elements/SearchBar";

const Hero = () => {
  return (
    <section className="hero">
      <div className="content">
        <h2 className="h2">Tutto sulle curve calcistiche italiane</h2>
        <h4 className="h4">
          dalle rivalità ai gemellaggi fino alle informazioni sui gruppi e le
          loro storie, un database completo per gli appassionati del tifo
        </h4>
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;
