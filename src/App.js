import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/homepage";
import CreatePost from "./components/create-post";
import Login from "./components/login";
import NavBar from "./components/navbar";
import { useState } from "react";
import useLocalStorage from "./components/local-storage";

function App() {
  const [isAuth, setIsAuth] = useLocalStorage("isAuth", false);
  const [userName, setUserName] = useLocalStorage("username", "");
  return (
    <Router>
      <NavBar
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        userName={userName}
      ></NavBar>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />}></Route>
        <Route
          path="/create-post"
          element={<CreatePost isAuth={isAuth} />}
        ></Route>
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} setUserName={setUserName} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
