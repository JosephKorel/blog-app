import React, { useEffect, useState } from "react";
import { auth, provider, storage } from "../firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { Input, Button } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function Account({
  setIsAuth,
  setUserName,
  setProfileImg,
  nickname,
  setNickname,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setProfileImg(user.photoURL);
        console.log(auth.currentUser.photoURL);
      } else {
      }
    });
  }, [onAuthStateChanged]);

  const googleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUserName(auth.currentUser.displayName);
      setIsAuth(true);
      navigate("/");
    });
  };

  const createAcc = () => {
    if (nickname) {
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
          setError(true);
          setPassword("");
        });
    }
  };

  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUserName(auth.currentUser.displayName);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {});
  };

  return (
    <div>
      {hasAccount ? (
        <div className="w-[95%] flex flex-col m-auto mt-6">
          <div>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              className="mb-2"
              focusBorderColor="#8338ec"
            />
            <Input
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              className="mb-2"
              type="password"
              focusBorderColor="#8338ec"
            />
          </div>
          <Button colorScheme="purple" onClick={logIn}>
            Entrar
          </Button>
          <div className="flex align-center justify-center mt-4">
            <div className="flex-grow flex flex-col align-center justify-center">
              <div className="border border-stone-800  h-0"></div>
            </div>
            <p className="px-4">OU</p>
            <div className="flex-grow flex flex-col align-center justify-center">
              <div className="border border-stone-800  h-0"></div>
            </div>
          </div>
          <Button
            className="mt-4"
            leftIcon={<FcGoogle />}
            onClick={googleSignIn}
          >
            Continuar com o Google
          </Button>
          <div className="text-center mt-4">
            <p>
              Não possui uma conta?{" "}
              <span>
                <Button
                  colorScheme="purple"
                  variant="link"
                  onClick={() => setHasAccount(false)}
                >
                  Criar conta
                </Button>
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-[95%] flex flex-col text-center m-auto">
          <h1 className="text-lg text-stone-800 font-medium mt-6">
            CRIAR CONTA
          </h1>
          <div className="">
            <Input
              placeholder="Nome de usuário"
              onChange={(e) => setNickname(e.target.value)}
              size="lg"
              width="full"
              className="mb-2 mt-6"
              focusBorderColor="#8338ec"
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              className="mb-2"
              focusBorderColor="#8338ec"
            />
            <Input
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              size="lg"
              className="mb-2"
              type="password"
              focusBorderColor="#8338ec"
              isInvalid={error}
            />
            {error && (
              <div className="flex align-center mb-2">
                <WarningIcon color="red.500" className="" />
                <p className="text-red-500 leading-4">Senha inválida</p>
              </div>
            )}
          </div>
          <Button colorScheme="purple" variant="solid" onClick={createAcc}>
            Criar conta
          </Button>
          <div className="flex align-center justify-center mt-4">
            <div className="flex-grow flex flex-col align-center justify-center">
              <div className="border border-stone-800  h-0"></div>
            </div>
            <p className="px-4">OU</p>
            <div className="flex-grow flex flex-col align-center justify-center">
              <div className="border border-stone-800  h-0"></div>
            </div>
          </div>
          <Button
            className="mt-4"
            leftIcon={<FcGoogle />}
            onClick={googleSignIn}
          >
            Continuar com o Google
          </Button>
        </div>
      )}
    </div>
  );
}

export default Account;
