import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import Navbar from "../ui/Navbar";
import AuthForm from "../elements/AuthForm";
import "../elements/SigninForm.css";
import "../elements/Elements.css";
import { Footer } from "../ui/Footer";

const AuthPage = () => {
  const [hiddenPassword, hidePassword] = useState(true);
  const [visibleForm, changeVisibleForm] = useState("signin");
  const [dataSignUp, setDataSignUp] = useState({
    email: "",
    password: "",
  });
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        dataSignIn.email,
        dataSignIn.password
      );
      if (userCredential) {
        setStatusMessage("Accesso riuscito!");
        changeVisibleForm("signin");
      }
    } catch (error) {
      setStatusMessage("Errore durante l'accesso. Riprova.");
      console.error("Error signing in:", error.code, error.message);
      setStatusMessage(`Errore: ${error.message}`); // mostra errore utile
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const createSignUp = await createUserWithEmailAndPassword(
        auth,
        dataSignUp.email,
        dataSignUp.password
      );
      if (createSignUp) {
        changeVisibleForm("signin");
        setStatusMessage("Registrazione riuscita! Ora puoi accedere.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setStatusMessage(
        "Errore durante la registrazione. Assicurati che l'email sia valida e non sia già in uso."
      );
    }
  };

  const fillData = (e, fn, data, dataObj) => {
    fn({
      ...dataObj,
      [data]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <AuthForm
          scope="signin"
          statusMessage={statusMessage}
          className="auth signin"
          changeVisibleForm={changeVisibleForm}
          hiddenPassword={hiddenPassword}
          fillData={fillData}
          setData={setDataSignIn}
          data={dataSignIn}
          sign={signIn}
          hidePassword={hidePassword}
        ></AuthForm>
        <AuthForm
          scope="signup"
          statusMessage={statusMessage}
          visibleForm={visibleForm}
          className={
            visibleForm === "signup" ? "auth signup visible" : "auth signup"
          }
          changeVisibleForm={changeVisibleForm}
          hiddenPassword={hiddenPassword}
          fillData={fillData}
          setData={setDataSignUp}
          data={dataSignUp}
          sign={signUp}
          hidePassword={hidePassword}
        ></AuthForm>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
