import { useEffect } from "react";
import "../elements/SigninForm.css";

const AuthForm = ({
  scope,
  statusMessage,
  className,
  changeVisibleForm,
  hiddenPassword,
  hidePassword,
  fillData,
  setData,
  data,
  sign,
}) => {
  //auth signin
  useEffect(() => {
    console.log("AuthForm mounted with data:", data);
  }, [data]);
  return (
    <form className={className} onSubmit={(e) => sign(e)}>
      <h4 className="h2">{scope === "signin" ? "Login" : "Registrati"}</h4>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => fillData(e, setData, "email", data)}
          type="text"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div className="input-password-container">
          <input
            className="input-password"
            onChange={(e) => fillData(e, setData, "password", data)}
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
      <input
        type="submit"
        value={scope === "signin" ? "Accedi" : "Registrati"}
        className="btn-primary"
      />
      <h6>
        Non hai un account?{" "}
        <span
          className="signup-text"
          onClick={() => {
            changeVisibleForm(scope === "signin" ? "signup" : "signin");
          }}
        >
          {scope === "signin" ? "Registrati." : "Accedi."}
        </span>
      </h6>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </form>
  );
};

export default AuthForm;
// This component is used for the authentication form in the application.
