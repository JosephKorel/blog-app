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
  MenuItemOption,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BiLogOutCircle, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Button } from "@mui/material";

function NavBar({ isAuth, setIsAuth, userName, profileImg, setProfileImg }) {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfileImg(user.photoURL);
      } else {
      }
    });
  }, []);

  console.log(profileImg);

  const signOutGoogle = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      navigate("/");
    });
  };
  return (
    <nav className="bg-[#e7dcc1] flex align-center justify-between">
      <div>
        {isAuth ? (
          <div className="flex flex-row-reverse align-center justify-between py-1 w-full">
            <p className="text-stone-900 text-lg flex flex-col align-center justify-center font-medium">
              {userName}
            </p>
            {profileImg == null ? (
              <UserOutlined style={{ fontSize: "32px", color: "#08c" }} />
            ) : (
              <div className="px-2">
                <img src={profileImg} className="w-10 rounded-full"></img>
              </div>
            )}
            <Menu>
              <MenuButton
                as={IconButton}
                rightIcon={<HamburgerIcon />}
              ></MenuButton>
              <MenuList
                bgColor="white"
                style={{ borderRadius: "4px", padding: "2px" }}
              >
                <MenuItem
                  icon={<Icon as={BiLogOut} w={18} h={18} />}
                  _hover={{ backgroundColor: "blue" }}
                >
                  {isAuth && (
                    <p
                      onClick={signOutGoogle}
                      className="hover:bg-black w-full p-1"
                    >
                      Sair
                    </p>
                  )}
                </MenuItem>
                <MenuItem
                  icon={<Icon as={CgProfile} w={18} h={18} />}
                  _hover={{ backgroundColor: "blue" }}
                >
                  <p className="w-full p-1">Alterar foto</p>
                </MenuItem>
                <MenuItem
                  icon={<Icon as={MdDriveFileRenameOutline} w={18} h={18} />}
                  _hover={{ backgroundColor: "blue" }}
                >
                  <p className="w-full p-1"> Alterar nome de usuário</p>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex flex-col align-center justify-center mr-5 text-lg">
        {location.pathname == "/" ? (
          <Link to="/create-post">
            <Button variant="text">Novo post</Button>
          </Link>
        ) : (
          <Link to="/">Home</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
