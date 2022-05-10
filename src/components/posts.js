import React from "react";
import { auth } from "../firebase-config";
import { HeartOutlined } from "@ant-design/icons";

function Posts({
  posts,
  deletePost,
  isAuth,
  addComment,
  setComment,
  deleteComment,
}) {
  console.log(posts);
  const commentSection = posts.comments.map((item, i) => (
    <>
      <p>{item}</p>
      <button onClick={() => deleteComment(posts.id, i)}>
        Excluir comentário
      </button>
    </>
  ));
  return (
    <div>
      <div>
        <h2>{posts.title}</h2>
        <p>{posts.body}</p>
        <HeartOutlined />
        <h4>Autor: {posts.user.name}</h4>
        <h3>Comentários</h3>
        <input
          placeholder="Comente"
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button onClick={() => addComment(posts.id)}>Novo comentário</button>
        <ul>
          <li>{commentSection}</li>
        </ul>
        {isAuth && posts.user.id == auth.currentUser.uid && (
          <button onClick={() => deletePost(posts.id)}>Excluir</button>
        )}
      </div>
    </div>
  );
}

export default Posts;
