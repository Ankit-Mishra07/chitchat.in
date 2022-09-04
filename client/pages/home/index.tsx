import React, { useEffect, useState } from "react";
import { MainBox } from "../../styled__components/common";

import Navigation from "../../components/ForHome/Navigation";
import HomeContent from "../../components/ForHome/HomeContent";
import { HomeBox } from "../../styled__components/home";
import { addUserReq, getMyusers } from "../../src/Fetch/Chat/AddUserReq";
import { MessageType } from "../../src/utils/types";
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

export type NotifyType = {
  length: number;
  messages: MessageType[]
}

const Index = () => {
  const [searchUser, setSearchUser] = useState<SearchedUser[]>([]);
  const [myUsers, setMyUsers] = useState<MyUserType[]>([]);
  const [notify,setNotify] = useState<NotifyType>({length:0,messages:[]})
  const [fetchAgain,setFetchAgain] = useState<boolean>(true);
  useEffect(() => {
    getMyusers(setMyUsers);
  }, [fetchAgain]);

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
          setNotify={setNotify}
          notify={notify}
        />
        <HomeContent myChats={myUsers} setFetchAgain={setFetchAgain} setNotify={setNotify} notify={notify}/>
      </HomeBox>
    </MainBox>
  );
};

export default Index;

