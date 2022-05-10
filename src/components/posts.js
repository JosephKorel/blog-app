import React from "react";
import { auth } from "../firebase-config";
import { HeartOutlined } from "@ant-design/icons";

function Posts({
  posts,
  deletePost,
  isAuth,
  index,
  addComment,
  setComment,
  deleteComment,
}) {
  const commentSection = posts.comments.map((item, i) => (
    <>
      {item.content !== "" && (
        <li>
          <p>{item.content}</p>
          <button onClick={() => deleteComment(posts.id, i)}>
            Excluir comentário
          </button>
        </li>
      )}
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
          id={`${index}_input`}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button onClick={() => addComment(posts.id)}>Novo comentário</button>
        <ul>{commentSection}</ul>
        {isAuth && posts.user.id == auth.currentUser.uid && (
          <button onClick={() => deletePost(posts.id)}>Excluir</button>
        )}
      </div>
    </div>
  );
}

export default Posts;
