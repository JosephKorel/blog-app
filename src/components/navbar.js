import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { UserOutlined } from "@ant-design/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Avatar } from "antd";
import "antd/es/avatar/style/index.css";

function NavBar({ isAuth, setIsAuth, userName, profileImg, setProfileImg }) {
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfileImg(user.photoURL);
      } else {
      }
    });
  }, []);

  const signOutGoogle = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      navigate("/blog-app/");
    });
  };
  return (
    <nav className="bg-[#e7dcc1] py-2 flex align-center justify-between sticky top-0 z-10">
      <div className="w-full">
        {isAuth ? (
          <div className="flex justify-between">
            <div className="flex align-center w-1/2">
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  border="none"
                  _focus={{ backgroundColor: "none" }}
                  _active={{ backgroundColor: "none" }}
                  _hover={{ backgroundColor: "none" }}
                ></MenuButton>
                <MenuList bgColor="#E7DCC1">
                  <MenuItem
                    icon={<Icon as={BiLogOut} w={18} h={18} />}
                    onClick={signOutGoogle}
                  >
                    Sair
                  </MenuItem>
                  <MenuItem
                    icon={<Icon as={CgProfile} w={18} h={18} />}
                    onClick={() => navigate("/profile")}
                  >
                    Perfil
                  </MenuItem>
                </MenuList>
              </Menu>

              {profileImg == null ? (
                <UserOutlined style={{ fontSize: "32px", color: "#08c" }} />
              ) : (
                <div className="pr-3">
                  <Avatar
                    src={profileImg}
                    alt={auth.currentUser?.displayName}
                    size="large"
                  />
                </div>
              )}
              <p className="text-stone-900 text-lg flex flex-col align-center justify-center font-medium">
                {userName}
              </p>
            </div>
            <div className="flex flex-col align-center justify-center mr-5 text-lg">
              {location.pathname == "/blog-app/" ? (
                <Link to="/create-post">
                  <Button variant="solid" colorScheme="purple">
                    Novo post
                  </Button>
                </Link>
              ) : (
                <Link to="/blog-app/">
                  <Button variant="solid" colorScheme="purple">
                    Home
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className=" ml-2 flex text-lg font-sans font-semibold text-[#383d4a] ">
            <h1
              onClick={() => navigate("/blog-app/")}
              className="cursor-pointer"
            >
              HOME
            </h1>
            <h1
              onClick={() => navigate("/account")}
              className="cursor-pointer text-purple-700 ml-6"
            >
              ENTRAR
            </h1>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
