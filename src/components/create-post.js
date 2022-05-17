import React, { useState } from "react";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { database, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import moment from "moment/min/moment-with-locales";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let navigate = useNavigate();

  const postCollection = collection(database, "posts");

  const submitPost = async () => {
    if (title && body) {
      await addDoc(postCollection, {
        title,
        body,
        comments: [
          {
            userId: "",
            content: "",
            name: "",
            userPhoto: "",
            at: "",
          },
        ],
        likes: { count: 0, users: [] },
        date: new Date().toLocaleDateString(),
        createdAt: serverTimestamp(),
        user: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
      navigate("/blog-app/");
    }
  };

  return (
    <div>
      <h1 className="font-title text-2xl md:text-3xl 2xl:text-4xl text-center mt-4">
        NOVA PUBLICAÇÃO
      </h1>
      <div className="2xl:w-2/3 m-auto">
        <div className="w-[95%] flex flex-col m-auto text-lg  font-title">
          <label className="md:text-xl 2xl:text-2xl 2xl:mb-2">TÍTULO</label>
          <input
            placeholder="Título..."
            onChange={(e) => setTitle(e.target.value)}
            className="border px-1 2xl:p-3 rounded-md focus:border focus:border-slate-400 border-main outline-none md:text-xl 2xl:text-2xl"
          ></input>
        </div>
        <div className="w-[95%] flex flex-col m-auto mt-6">
          <p className="text-lg md:text-xl 2xl:text-2xl 2xl:mb-2 font-title">
            CONTEÚDO
          </p>
          <textarea
            placeholder="Escreva aqui..."
            onChange={(e) => setBody(e.target.value)}
            className="border rounded-md p-1 border-main text-base font-normal h-40 focus:border focus:border-slate-400 outline-none 2xl:text-lg"
          ></textarea>
        </div>
      </div>
      <div className="w-[95%] 2xl:w-[60%] mt-6 m-auto">
        <Button
          onClick={submitPost}
          _disabled={isAuth ? false : true}
          colorScheme="purple"
          width="full"
        >
          Postar
        </Button>
      </div>
    </div>
  );
}

export default CreatePost;
