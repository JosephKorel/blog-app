import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  let navigate = useNavigate();

  const postCollection = collection(database, "posts");

  const submitPost = async () => {
    await addDoc(postCollection, {
      title,
      body,
      comments: [],
      liked: false,
      user: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Criar novo post</h1>
      <div>
        <label>Título</label>
        <input
          placeholder="Título..."
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br></br>
        <label>Publicação</label>
        <textarea
          placeholder="Publicação..."
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button onClick={submitPost} disabled={isAuth ? false : true}>
        Postar
      </button>
    </div>
  );
}

export default CreatePost;
