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
import useLocalStorage from "./local-storage";
import { IconButton, Input } from "@chakra-ui/react";
import { DownCircleFilled } from "@ant-design/icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import moment from "moment/min/moment-with-locales";

function Home({ isAuth, profileImg }) {
  const [postList, setPostList] = useLocalStorage("postList", []);
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(0);
  const [postIndex, setPostIndex] = useState([]);

  console.log(postList[0]);

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

    if (comment == "") return;

    await updateDoc(targetPost, {
      comments: [
        {
          userId: auth.currentUser.uid,
          content: comment,
          name: auth.currentUser.displayName,
          userPhoto: auth.currentUser.photoURL,
          at: `${moment().format()}`,
        },
        ...snapshot.data().comments,
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
      setPostIndex(postIndex.filter((item) => item !== index));
      getPost();
    } else {
      await updateDoc(targetPost, {
        likes: {
          count: snapshot.data().likes.count + 1,
          users: [...snapshot.data().likes.users, auth.currentUser.uid],
        },
      });
      setPostIndex([...postIndex, index]);
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
              postList={postList}
              postIndex={postIndex}
              key={index}
              profileImg={profileImg}
              deletePost={(id) => deletePost(id)}
              addComment={(id) => addComment(id, index)}
              deleteComment={(id, i) => deleteComment(id, index, i)}
              likePost={(id) => likePost(id, index)}
            />
          ))}
      </div>
      <div className="my-2">
        <ReactPaginate
          previousLabel={
            <IconButton
              as={ChevronLeftIcon}
              hidden={pageCount <= 1 && true}
              size="sm"
            />
          }
          nextLabel={<IconButton as={ChevronRightIcon} size="sm" />}
          pageCount={pageCount}
          onPageChange={pageChange}
          containerClassName="container"
          pageClassName="pages"
          activeClassName="active-page"
        />
      </div>
    </div>
  );
}

export default Home;
