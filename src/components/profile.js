import React, { useState } from "react";
import { Button, Avatar, Input } from "@chakra-ui/react";
import { auth } from "../firebase-config";
import ChangeModal from "./change-modal";
import { updateProfile } from "firebase/auth";

function Profile({
  setProfileImg,
  profileImg,
  userName,
  setUserName,
  nickname,
  setNickname,
}) {
  const [change, setChange] = useState(false);

  const changeNickname = async () => {
    if (nickname) {
      await updateProfile(auth.currentUser, {
        displayName: `${nickname}`,
      });
      setUserName(nickname);
      setChange(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col align-center justify-center text-center mt-6">
        <Avatar src={profileImg} size="xl" className="m-auto" />
        <h1 className="mt-4 font-sans font-semibold text-xl 2xl:text-2xl">
          {userName}
        </h1>
        <div className="w-2/3 2xl:w-1/3 lg:w-1/2 m-auto flex flex-col align-center justify-around mt-4">
          <ChangeModal title="Alterar foto" setProfileImg={setProfileImg} />
          <Button colorScheme="purple" onClick={() => setChange(true)}>
            Alterar nome de usuário
          </Button>
        </div>
        {change && (
          <div className="w-2/3 lg:w-1/2 2xl:w-1/3 m-auto mt-4">
            <Input
              placeholder="Novo nome de usuário"
              onChange={(e) => setNickname(e.target.value)}
            />
            <Button
              colorScheme="purple"
              onClick={changeNickname}
              className="mt-4"
            >
              Salvar
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => setChange(false)}
              className="mt-4 ml-2"
              variant="ghost"
            >
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
