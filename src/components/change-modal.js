import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { auth, storage } from "../firebase-config";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

function ChangeModal({ title, setProfileImg }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uImg, setUImg] = useState(null);

  const imgPath = ref(storage, "images/");
  const imgUpload = () => {
    if (uImg == null) return;

    const imgRef = ref(storage, `images/${auth.currentUser.displayName}`);
    uploadBytes(imgRef, uImg).then(() => {
      listAll(imgPath).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            console.log(url);
            setProfileImg(url);
            updateProfile(auth.currentUser, {
              photoURL: `${url}`,
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

  return (
    <>
      <Button onClick={onOpen} colorScheme="purple" className="mb-2">
        {title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar foto de perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label
              for="photo"
              className="p-2 bg-purple-600 text-slate-100 rounded-md cursor-pointer px-4"
            >
              Selecionar foto
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              className="hidden"
              onChange={(event) => setUImg(event.target.files[0])}
            ></input>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              disabled={uImg == null ? true : false}
              onClick={imgUpload}
            >
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Voltar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeModal;
