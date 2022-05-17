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
}) {
  let locale = window.navigator.userLanguage || window.navigator.language;
  moment.locale(locale);

  const commentSection = posts.comments.map((item, i) => (
    <>
      {item.content !== "" && (
        <Comment
          author={<a className="2xl:text-lg">{item.name}</a>}
          avatar={
            <Avatar
              src={item.userPhoto}
              alt={item.name}
              size={window.innerWidth > 1536 && "large"}
            />
          }
          content={
            <div className="flex justify-between">
              <p className="2xl:text-lg">{item.content}</p>
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
              <span className="2xl:text-lg">{moment(item.at).fromNow()}</span>
            </Tooltip>
          }
        />
      )}
    </>
  ));

  return (
    <div>
      <div>
        <div className="flex flex-col lg:w-5/6 2xl:w-2/3 m-auto">
          <h2 className="m-auto text-2xl 2xl:text-5xl font-title text-center mt-3 2xl:mt-6 w-[92%]">
            {posts.title}
          </h2>
          <div className="mt-2 2xl:mt-5 w-[95%] m-auto bg-main-300">
            <Paper elevation={0}>
              <p className="p-2 text-justify 2xl:text-lg leading-5 indent-1.5 max-h-72 overflow-auto">
                {posts.body}
              </p>
              <div className="2xl:text-lg flex flex-row-reverse font-medium italic mr-2">
                <p>
                  {posts.user.name}, <span>{posts.date}</span>
                </p>
              </div>
            </Paper>
          </div>
        </div>
        <div className="m-auto flex align-center justify-between w-[95%] lg:w-5/6 2xl:w-2/3">
          <div className="flex align-center mt-2">
            <div>
              {posts.likes.users.includes(auth.currentUser?.uid) ? (
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
        <div className="w-[95%] lg:w-5/6 2xl:w-2/3 m-auto mt-2">
          <h3 className="font-medium 2xl:text-xl 2xl:mb-2">Comentários</h3>
          <div className="flex flex-col">
            <textarea
              className="border border-main rounded-md focus:border focus:border-slate-400 outline-none indent-1 md:h-28 2xl:text-lg"
              placeholder="Compartilhe sua opinião"
              id={`${index}_input`}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="mt-2">
              <Button
                onClick={() => addComment(posts.id)}
                colorScheme="purple"
                size={window.innerWidth > 1280 ? "lg" : "md"}
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[95%] lg:w-5/6 2xl:w-2/3 m-auto">
          {commentSection}
        </div>
        <div className="w-[90%] lg:w-[80%] 2xl:w-[60%] m-auto h-1 rounded-full bg-[#ffbe0b] mt-6"></div>
      </div>
    </div>
  );
}

export default Posts;

/* Os maiores escândalos de Hollywood que a história esqueceu

Muitas pessoas acreditam firmemente que Walt Disney pode ter sido um antissemita, embora haja poucas evidências concretas para provar isso. Independentemente da falta de provas, ele não teve problemas em associar-se com pessoas abertamente hostis a judeus e orgulhosos disso! */
