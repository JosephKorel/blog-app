import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UserOutlined } from "@ant-design/icons";

function NavBar({ isAuth, setIsAuth, userName }) {
  let navigate = useNavigate();
  let userPhoto = "";
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userPhoto += user.photoURL;
    } else {
    }
  });

  const signOutGoogle = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      navigate("/");
    });
  };
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create-post">Novo post</Link>
      <Link to="/login">Criar conta</Link>
      {isAuth && <button onClick={signOutGoogle}>Sair</button>}
      {isAuth ? (
        <>
          <h2>Logged as: {userName}</h2>
          {userPhoto == "" ? (
            <UserOutlined style={{ fontSize: "32px", color: "#08c" }} />
          ) : (
            <img src={`${auth.currentUser.photoURL}`}></img>
          )}
        </>
      ) : (
        <div></div>
      )}
    </nav>
  );
}

export default NavBar;
