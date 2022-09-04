import React, { useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { NotifyType, SearchedUser } from "../../pages/home";
import { searchUserwithParam } from "../../src/Fetch/SearchUserReq/GETsearchedReg";
import { getCookie } from "../../src/utils/cookie";
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
  setNotify:Function;
  notify: NotifyType;
};


const Navigation = ({
  searchUser,
  setSearchUser,
  addUserToMyAccount,
  setNotify,
  notify
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
            <BsFillBellFill style={{ fontSize: "20px", color: "#474545" }} onClick={() => {
              //TODO: A dialog box which will list out all notified messages

              setNotify({length:0,messages:[]}) // Temporary
            }
          }/>
          <Badge>{notify.length?notify.length:""}</Badge>
          </span>
          <span>
          <UserImage src={getCookie("user_avatar")} alt="profile" onClick={() => {
            // user should show a dialog box with username and logout button 
          }}/>
          </span>
        </div>
      </div>
      <Hamburger onClick={handleHamburger}>☰</Hamburger>
    </Nav>
  );
};

export default Navigation;