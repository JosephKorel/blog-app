import React, { useEffect, useState } from "react";
import { database, auth } from "../firebase-config";
import {
  getDocs,
  collection,
  getDoc,
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

  const addComment = async (id, index) => {
    const targetPost = doc(database, "posts", id);
    const targetInput = document.getElementById(`${index}_input`);

    const snapshot = await getDoc(targetPost);

    await updateDoc(targetPost, {
      comments: [
        ...snapshot.data().comments,
        { userId: auth.currentUser.uid, content: comment },
      ],
    }).then(() => {
      getPost();
      targetInput.value = "";
    });
  };

  const deleteComment = async (id, index, i) => {
    const targetPost = doc(database, "posts", id);
    const newPostList = postList.slice();
    const targetComment = newPostList[index].comments[i].content;
    const filteredComment = newPostList[index].comments.filter(
      (item) => item !== newPostList[index].comments[i]
    );

    await updateDoc(targetPost, { comments: filteredComment }).then(() => {
      getPost();
    });
  };
  return (
    <div>
      <h1>Publicações</h1>
      <div>
        {postList.map((posts, index) => (
          <Posts
            posts={posts}
            isAuth={isAuth}
            comment={comment}
            setComment={setComment}
            index={index}
            key={index}
            deletePost={(id) => deletePost(id)}
            addComment={(id) => addComment(id, index)}
            deleteComment={(id, i) => deleteComment(id, index, i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
