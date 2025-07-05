import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import Navbar from "../ui/Navbar";
import "../elements/SigninForm.css";
import "../elements/Elements.css";

const AuthPage = () => {
  const [hiddenPassword, hidePassword] = useState(true);
  const [visibleForm, changeVisibleForm] = useState("signin");
  return (
    <>
      <Navbar />
      <div className="form-container">
        <form className="auth signin">
          <h4 className="h2">Login</h4>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              className="input-password"
              type={hiddenPassword ? "password" : "text"}
            />
          </div>

          <input type="submit" value="Accedi" className="btn-primary" />
          <h6>
            Non hai un account?{" "}
            <span
              className="signup-text"
              onClick={() => {
                changeVisibleForm("signup");
              }}
            >
              Iscriviti.
            </span>
          </h6>
        </form>
        <form
          className={
            visibleForm === "signup" ? "auth signup visible" : "auth signup"
          }
        >
          <h4 className="h2">Registrati</h4>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div className="input-password-container">
              <input
                className="input-password"
                type={hiddenPassword ? "password" : "text"}
              />
              <span
                className="toggle-password"
                onClick={() => {
                  hidePassword(!hiddenPassword);
                }}
              >
                {hiddenPassword ? "Mostra" : "Nascondi"}
              </span>
            </div>
          </div>

          <input type="submit" value="Iscriviti" className="btn-primary" />
          <h6>
            Hai già un account?{" "}
            <span
              className="signup-text"
              onClick={() => {
                changeVisibleForm("signin");
              }}
            >
              Accedi.
            </span>
          </h6>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
