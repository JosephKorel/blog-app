import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import "antd/es/comment/style/index.css";
import { HeartOutlined, HeartFilled, DeleteFilled } from "@ant-design/icons";
import Paper from "@mui/material/Paper";
import { Button } from "@chakra-ui/react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment/min/moment-with-locales";
import "moment/locale/pt-br";
import { onAuthStateChanged } from "firebase/auth";

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
  let locale = window.navigator.userLanguage || window.navigator.language;
  moment.locale(locale);

  const commentSection = posts.comments.map((item, i) => (
    <>
      {item.content !== "" && (
        <Comment
          author={<a>{item.name}</a>}
          avatar={<Avatar src={item.userPhoto} alt={item.name} />}
          content={
            <div className="flex justify-between">
              <p>{item.content}</p>
              {isAuth && auth.currentUser?.uid == item.userId && (
                <DeleteFilled
                  style={{ color: "#8d99ae" }}
                  onClick={() => deleteComment(posts.id, i)}
                />
              )}
            </div>
          }
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment(item.at).fromNow()}</span>
            </Tooltip>
          }
        />
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
            <Paper elevation={0}>
              <p className="p-2 text-justify leading-5 indent-1.5 max-h-72 overflow-auto">
                {posts.body}
              </p>
              <div className="flex flex-row-reverse font-medium italic mr-2">
                <p>
                  {posts.user.name}, <span>{posts.date}</span>
                </p>
              </div>
            </Paper>
          </div>
        </div>
        <div className="m-auto flex align-center justify-between w-[95%]">
          <div className="flex align-center mt-2">
            <div>
              {postIndex.includes(index) ? (
                <HeartFilled
                  onClick={() => likePost(posts.id)}
                  style={{ fontSize: "20px", color: "#ce4257" }}
                />
              ) : (
                <HeartOutlined
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
            {isAuth && posts.user.id == auth.currentUser?.uid && (
              <Button
                variant="solid"
                onClick={() => deletePost(posts.id)}
                colorScheme="red"
                size="sm"
                className="mt-2"
              >
                Excluir
              </Button>
            )}
          </div>
        </div>
        <div className="w-[95%] m-auto mt-2">
          <h3 className="font-medium">Comentários</h3>
          <div className="flex flex-col">
            <textarea
              className="border border-main rounded-md focus:border focus:border-slate-400 outline-none indent-1"
              placeholder="Compartilhe sua opinião"
              id={`${index}_input`}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="mt-2">
              <Button onClick={() => addComment(posts.id)} colorScheme="purple">
                Enviar
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[95%] m-auto">{commentSection}</div>
        <div className="w-[90%] m-auto h-1 rounded-full bg-[#ffbe0b] mt-6"></div>
      </div>
    </div>
  );
}

export default Posts;

/* Os maiores escândalos de Hollywood que a história esqueceu

Muitas pessoas acreditam firmemente que Walt Disney pode ter sido um antissemita, embora haja poucas evidências concretas para provar isso. Independentemente da falta de provas, ele não teve problemas em associar-se com pessoas abertamente hostis a judeus e orgulhosos disso! */
