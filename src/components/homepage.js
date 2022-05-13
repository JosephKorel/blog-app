import React, { useEffect, useState } from "react";
import { database, auth } from "../firebase-config";
import {
  getDocs,
  collection,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import Posts from "./posts";
import ReactPaginate from "react-paginate";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(0);
  const [postIndex, setPostIndex] = useState(null);

  /* pagination */
  const postPerPage = 5;
  const visitedPages = postPerPage * page;
  const pageCount = Math.ceil(postList.length / postPerPage);
  const pageChange = ({ selected }) => {
    setPage(selected);
  };

  const postCollection = collection(database, "posts");

  const getPost = async () => {
    const data = await getDocs(postCollection);
    const q = query(postCollection, orderBy("createdAt", "desc"));
    const sorted = await getDocs(q);
    const sortedData = data.docs.sort((a, b) => a.date - b.date);
    const newData = sorted.docs.map((doc) => ({
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
        {
          userId: auth.currentUser.uid,
          content: comment,
          name: auth.currentUser.displayName,
        },
      ],
    }).then(() => {
      getPost();
      targetInput.value = "";
    });
  };

  const likePost = async (id, index) => {
    const targetPost = doc(database, "posts", id);
    const snapshot = await getDoc(targetPost);
    if (isAuth == false) return;
    else if (snapshot.data().likes.users.includes(auth.currentUser.uid)) {
      const filteredUsers = snapshot
        .data()
        .likes.users.filter((item) => item !== auth.currentUser.uid);
      await updateDoc(targetPost, {
        likes: {
          count: snapshot.data().likes.count - 1,
          users: filteredUsers,
        },
      });
      setPostIndex(null);
      getPost();
    } else {
      await updateDoc(targetPost, {
        likes: {
          count: snapshot.data().likes.count + 1,
          users: [...snapshot.data().likes.users, auth.currentUser.uid],
        },
      });
      setPostIndex(index);
      getPost();
    }
  };

  const deleteComment = async (id, index, i) => {
    const targetPost = doc(database, "posts", id);
    const newPostList = postList.slice();
    const filteredComment = newPostList[index].comments.filter(
      (item) => item !== newPostList[index].comments[i]
    );

    await updateDoc(targetPost, { comments: filteredComment }).then(() => {
      getPost();
    });
  };
  return (
    <div className="bg-main-300">
      <div>
        {postList
          .slice(visitedPages, visitedPages + postPerPage)
          .map((posts, index) => (
            <Posts
              posts={posts}
              isAuth={isAuth}
              comment={comment}
              setComment={setComment}
              index={index}
              postIndex={postIndex}
              key={index}
              deletePost={(id) => deletePost(id)}
              addComment={(id) => addComment(id, index)}
              deleteComment={(id, i) => deleteComment(id, index, i)}
              likePost={(id) => likePost(id, index)}
            />
          ))}
      </div>
      <div>
        <ReactPaginate
          previousLabel="Página anterior"
          nextLabel="Próxima página"
          pageCount={pageCount}
          onPageChange={pageChange}
        />
      </div>
    </div>
  );
}

export default Home;
