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
        comments: [{ userId: "", content: "", name: "", userPhoto: "" }],
        likes: { count: 0, users: [] },
        date: new Date().toLocaleDateString(),
        createdAt: serverTimestamp(),
        user: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
      navigate("/");
    }
  };

  return (
    <div>
      <h1 className="font-title text-2xl text-center mt-4">NOVA PUBLICAÇÃO</h1>
      <div>
        <div className="w-[95%] flex flex-col m-auto text-lg font-title">
          <label>TÍTULO</label>
          <input
            placeholder="Título..."
            onChange={(e) => setTitle(e.target.value)}
            className="border px-1 rounded-md focus:border focus:border-slate-400 border-main outline-none"
          ></input>
        </div>
        <div className="w-[95%] flex flex-col m-auto  mt-6">
          <p className="text-lg font-title">CONTEÚDO</p>
          <textarea
            placeholder="Escreva aqui..."
            onChange={(e) => setBody(e.target.value)}
            className="border rounded-md p-1 border-main text-base font-normal h-40 focus:border focus:border-slate-400 outline-none"
          ></textarea>
        </div>
      </div>
      <div className="w-[95%] mt-6 m-auto">
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
