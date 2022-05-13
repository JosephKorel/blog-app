import React, { useState } from "react";
import { auth } from "../firebase-config";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function Posts({
  posts,
  deletePost,
  isAuth,
  index,
  addComment,
  setComment,
  deleteComment,
  likePost,
  postIndex,
}) {
  const commentSection = posts.comments.map((item, i) => (
    <>
      {item.content !== "" && (
        <li>
          <p>
            {item.content} by <strong>{item.name}</strong>
          </p>
          {isAuth && auth.currentUser.uid == item.userId && (
            <button onClick={() => deleteComment(posts.id, i)}>
              Excluir comentário
            </button>
          )}
        </li>
      )}
    </>
  ));

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <h2 className="m-auto text-2xl font-title text-center mt-3 w-[92%]">
            {posts.title}
          </h2>
          <div className="mt-2 w-[95%] m-auto bg-main-300">
            <Paper>
              <p className="p-2 text-justify leading-5">{posts.body}</p>
              <div className="flex flex-row-reverse font-medium italic mr-2">
                <p>
                  {posts.user.name}, <span>{posts.date}</span>
                </p>
              </div>
            </Paper>
          </div>
        </div>
        <div className="flex align-center justify-between">
          <div className="flex align-center ml-1 mt-2">
            <div>
              {postIndex != index ? (
                <HeartOutlined
                  onClick={() => likePost(posts.id)}
                  style={{ fontSize: "20px", color: "#ce4257" }}
                />
              ) : (
                <HeartFilled
                  onClick={() => likePost(posts.id)}
                  style={{ fontSize: "20px", color: "#ce4257" }}
                />
              )}
            </div>
            <p className="text-lg flex flex-col align-baseline ml-1">
              {posts.likes.count}
            </p>
          </div>
          <div>
            {isAuth && posts.user.id == auth.currentUser.uid && (
              <Button
                onClick={() => deletePost(posts.id)}
                variant="contained"
                size="small"
                sx={{ marginTop: "6px" }}
                color="error"
              >
                Excluir
              </Button>
            )}
          </div>
        </div>
        <h3>Comentários</h3>
        <input
          placeholder="Comente"
          id={`${index}_input`}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button onClick={() => addComment(posts.id)}>Novo comentário</button>
        <ul>{commentSection}</ul>
      </div>
    </div>
  );
}

export default Posts;
