import React, { useEffect, useState } from "react";
import { database, auth } from "../firebase-config";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Posts from "./posts";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const [comment, setComment] = useState("");

  const postCollection = collection(database, "posts");
  const getPost = async () => {
    const data = await getDocs(postCollection);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPostList(newData);
  };

  useEffect(() => {
    getPost();
  }, []);

  const deletePost = async (id) => {
    const targetPost = doc(database, "posts", id);
    await deleteDoc(targetPost);
    const filteredPosts = postList.filter((item) => item.id !== id);
    setPostList(filteredPosts);
  };

  const addComment = async (id) => {
    const targetPost = doc(database, "posts", id);
    await updateDoc(targetPost, { comments: arrayUnion(comment) }).then(() => {
      getPost();
    });
  };

  const deleteComment = async (id, index, i) => {
    const targetPost = doc(database, "posts", id);
    const newPostList = postList.slice();
    const targetComment = newPostList[index].comments[i];
    console.log(targetComment);
    await updateDoc(targetPost, { comments: arrayRemove(targetComment) }).then(
      () => {
        getPost();
      }
    );
  };
  return (
    <div>
      <h1>Publicações</h1>
      <div>
        {postList.map((posts, index) => (
          <Posts
            posts={posts}
            isAuth={isAuth}
            setComment={setComment}
            key={index}
            deletePost={(id) => deletePost(id)}
            addComment={(id) => addComment(id)}
            deleteComment={(id, i) => deleteComment(id, index, i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
