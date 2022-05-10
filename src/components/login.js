import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function Login({ setIsAuth, setUserName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const googleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUserName(auth.currentUser.displayName);
      setIsAuth(true);
    });
  };

  const createAcc = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        updateProfile(auth.currentUser, { displayName: `${nickname}` }).then(
          () => {
            setUserName(auth.currentUser.displayName);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUserName(auth.currentUser.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2>Criar conta</h2>
      <label>Nome de usuário</label>
      <input
        placeholder="Username"
        onChange={(e) => setNickname(e.target.value)}
      ></input>
      <label>Email</label>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label>Senha</label>
      <input
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={createAcc}>Registrar</button>
      <button onClick={logIn}>Entrar</button>
      <button onClick={googleSignIn}>Entrar com Google</button>
    </div>
  );
}

export default Login;
