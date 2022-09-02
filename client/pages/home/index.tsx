import React, { useEffect, useState } from "react";
import { MainBox } from "../../styled__components/common";

import Navigation from "../../components/ForHome/Navigation";
import HomeContent from "../../components/ForHome/HomeContent";
import { HomeBox } from "../../styled__components/home";
import { addUserReq, getMyusers } from "../../src/Fetch/Chat/AddUserReq";
export type SearchedUser = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  profile_avatar_url: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};
export type MyUserType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  latestMessage?: Object & { sender:SearchedUser;content: string; createdAt: string };
  users: SearchedUser[];
  createdAt: string;
  updatedAt: string;
};
const Index = () => {
  const [searchUser, setSearchUser] = useState<SearchedUser[]>([]);
  const [myUsers, setMyUsers] = useState<MyUserType[]>([]);
  useEffect(() => {
    getMyusers(setMyUsers);
  }, []);
  const addUserToMyAccount = async (userId: string) => {
    addUserReq(userId, setMyUsers, getMyusers);
  };
  return (
    <MainBox>
      <HomeBox>
        <Navigation
          searchUser={searchUser}
          setSearchUser={setSearchUser}
          addUserToMyAccount={addUserToMyAccount}
        />
        <HomeContent myChats={myUsers} />
      </HomeBox>
    </MainBox>
  );
};

export default Index;

