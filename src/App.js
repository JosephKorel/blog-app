import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/homepage";
import CreatePost from "./components/create-post";
import NavBar from "./components/navbar";
import { useState } from "react";
import useLocalStorage from "./components/local-storage";
import Account from "./components/account";

function App() {
  const [isAuth, setIsAuth] = useLocalStorage("isAuth", false);
  const [userName, setUserName] = useLocalStorage("username", "");
  const [profileImg, setProfileImg] = useState(null);

  return (
    <Router>
      <NavBar
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        userName={userName}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
      ></NavBar>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />}></Route>
        <Route
          path="/create-post"
          element={<CreatePost isAuth={isAuth} />}
        ></Route>
        <Route
          path="/account"
          element={
            <Account
              isAuth={isAuth}
              userName={userName}
              profileImg={profileImg}
              setIsAuth={setIsAuth}
              setUserName={setUserName}
              setProfileImg={setProfileImg}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
