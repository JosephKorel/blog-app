import React, { useEffect, useState } from "react";
import { auth, provider, storage } from "../firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { UserOutlined } from "@ant-design/icons";
import { v4 } from "uuid";

function Account({
  isAuth,
  setIsAuth,
  setUserName,
  userName,
  profileImg,
  setProfileImg,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [uImg, setUImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setProfileImg(user.photoURL);
      } else {
      }
    });
  }, [onAuthStateChanged]);

  useEffect(() => {
    setProfileImg(imgUrl[0]);
  }, [imgUrl]);

  /* console.log(auth.currentUser.photoURL);
  console.log(profileImg); */

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
        setIsAuth(true);
      })
      .catch((error) => {});
  };

  const imgPath = ref(storage, "images/");
  const imgUpload = () => {
    if (uImg == null) return;

    const imgRef = ref(storage, `images/${uImg.name + v4()}`);
    uploadBytes(imgRef, uImg).then(() => {
      listAll(imgPath).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImgUrl((prev) => [...prev, url]);
            setProfileImg(imgUrl[0]);
            updateProfile(auth.currentUser, {
              photoURL: `${imgUrl[0]}`,
            })
              .then(() => {
                console.log("success");
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });
      });
    });
  };
  console.log(profileImg);
  console.log(imgUrl[0]);

  return (
    <div>
      {isAuth ? (
        <div>
          <h1>Bem vindo {userName}</h1>
          {profileImg == "" ? (
            <UserOutlined style={{ fontSize: "32px", color: "#08c" }} />
          ) : (
            <>
              <img src={`${profileImg}`}></img>
            </>
          )}
          <h3>Alterar foto</h3>
          <input
            type="file"
            onChange={(e) => setUImg(e.target.files[0])}
            placeholder="Selecionar imagem"
          ></input>
          <button onClick={imgUpload}>Confirmar</button>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Account;
