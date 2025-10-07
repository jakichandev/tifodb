import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="icons">
        <div className="portfolio">
          <Link>
            <CgWebsite></CgWebsite>
          </Link>

          <span className="txt">Portfolio</span>
        </div>
        <div className="github">
          <Link>
            <FaGithub></FaGithub>
          </Link>
          <span className="txt">Github</span>
        </div>
      </div>
      <div className="copyright">
        <p>Demo Web Application by Jacopo Gianfaldoni</p>
      </div>
    </footer>
  );
};
