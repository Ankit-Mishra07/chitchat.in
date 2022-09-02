
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { SearchedUser } from "../../pages/home";
import { searchUserwithParam } from "../../src/Fetch/SearchUserReq/GETsearchedReg";
import { Input } from "../../styled__components/common";
import {
  Badge,
  Hamburger,
  HomeBox,
  Nav,
  SearchBox,
  SearchResultBox,
  UserImage,
} from "../../styled__components/home";
import Logo from "../Logo/Logo";

type Props = {
  searchUser: SearchedUser[];
  setSearchUser: Function;
  addUserToMyAccount: Function;
};
const Navigation = ({
  searchUser,
  setSearchUser,
  addUserToMyAccount,
}: Props) => {
  const [showNav, setShowNav] = useState<boolean>(true);
  const handleHamburger = () => {
    setShowNav(!showNav);
  };
  let timeout: ReturnType<typeof setTimeout>;
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (e.target.value) {
        searchUserwithParam(e.target.value, setSearchUser);
      } else {
        setSearchUser([]);
      }
    }, 1500);
  };
  return (
    <Nav showNav={showNav}>
      <div>
        <SearchBox style={{ padding: 0 }}>
          <Input
            placeholder="Search user..."
            w="100%"
            onChange={(e) => handleSearch(e)}
          />
          {searchUser.length > 0 && (
            <SearchResultBox style={{ padding: 0, margin: 0 }}>
              {searchUser.map((elem, i) => (
                <div
                  onClick={() => {
                    addUserToMyAccount(elem._id);
                    setSearchUser([]);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 6,
                    margin: 0,
                  }}
                  key={elem._id}
                >
                  {elem.username}
                  <UserImage src={elem.profile_avatar_url} alt="myprofile" />
                </div>
              ))}
            </SearchResultBox>
          )}
        </SearchBox>

        <Logo />
        <div>
          <span style={{ position: "relative", cursor: "pointer" }}>
            <BsFillBellFill style={{ fontSize: "20px", color: "#474545" }} />
            <Badge>0</Badge>
          </span>
          <span>
            <Image
              src="/avatar.jpg"
              alt="userhere"
              height={30}
              width={30}
              style={{ borderRadius: "50%" }}
            />
          </span>
        </div>
      </div>
      <Hamburger onClick={handleHamburger}>☰</Hamburger>
    </Nav>
  );
};

export default Navigation;