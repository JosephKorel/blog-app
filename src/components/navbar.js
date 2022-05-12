import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UserOutlined } from "@ant-design/icons";

function NavBar({ isAuth, setIsAuth, userName, profileImg, setProfileImg }) {
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfileImg(user.photoURL);
      } else {
      }
    });
  }, []);

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
      <Link to="/account">Conta</Link>
      {isAuth && <button onClick={signOutGoogle}>Sair</button>}
      {isAuth ? (
        <div>
          <h2>Logged as: {userName}</h2>
          {profileImg == null ? (
            <UserOutlined style={{ fontSize: "32px", color: "#08c" }} />
          ) : (
            <img src={profileImg}></img>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
}

export default NavBar;
