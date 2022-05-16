import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/homepage";
import CreatePost from "./components/create-post";
import NavBar from "./components/navbar";
import { useState } from "react";
import useLocalStorage from "./components/local-storage";
import Account from "./components/account";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { ChakraProvider } from "@chakra-ui/react";
import Profile from "./components/profile";

function App() {
  const [isAuth, setIsAuth] = useLocalStorage("isAuth", false);
  const [userName, setUserName] = useLocalStorage("username", "");
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4bc6b2",
      },
      secondary: {
        main: "#2e53dc",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Router>
          <NavBar
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            userName={userName}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
          ></NavBar>
          <Routes>
            <Route
              path="/"
              element={<Home isAuth={isAuth} profileImg={profileImg} />}
            ></Route>
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
                  nickname={nickname}
                  setNickname={setNickname}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  setProfileImg={setProfileImg}
                  profileImg={profileImg}
                  userName={userName}
                  setUserName={setUserName}
                  nickname={nickname}
                  setNickname={setNickname}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
