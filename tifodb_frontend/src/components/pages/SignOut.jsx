import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import "./Signout.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const triggerSignOut = async () => {
    if (!auth) {
      navigate("/error");
      return;
    }
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="popup">
      <div className="wrapper">
        <h5>Sei sicuro di voler uscire?</h5>
        <div className="buttons">
          <button onClick={triggerSignOut} className="btn-primary">
            Esci
          </button>
          <button className="btn-primary">Annulla</button>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
