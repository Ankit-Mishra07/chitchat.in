import React from "react";
import { MyUserType } from "../../../pages/home";
import { getCookie } from "../../../src/utils/cookie";
import { Text } from "../../../styled__components/common";
import {getTime} from "../../../src/utils/logic"
import {
  ChatList,
  LeftClient,
  MessageBox,
  UserDataBox,
  UserImage,
} from "../../../styled__components/home";
import NestedModal from "./GroupCreate";
import { Box } from "@mui/material";
type Props = {
  myChats: MyUserType[];
  getChatDetailsOfSingle: Function;
  click: boolean;
  setClick: Function;
  setFetchAgain:Function;
};
const LeftClientBox = ({
  myChats,
  getChatDetailsOfSingle,
  click,
  setClick,
  setFetchAgain,
}: Props) => {

  return (
    <LeftClient>
      <NestedModal setFetchAgain={setFetchAgain}/>
      {myChats?.map((el) => (
        <ChatList
          key={el._id}
          onClick={() => {
            getChatDetailsOfSingle(el);
            setClick(false);
          }}
        >

          {!el.isGroupChat && <UserDataBox>
            <UserImage src={el.users[0]._id!==getCookie("chatuser")?el.users[0].profile_avatar_url:el.users[1].profile_avatar_url} />
            <Text>{el.users[0]._id!==getCookie("chatuser")?el.users[0].username:el.users[1].username}</Text>
          </UserDataBox>}
          {el.isGroupChat && <UserDataBox>
            <UserImage src={el.latestMessage?.sender.profile_avatar_url} />
            <Text>{el.chatName}</Text>
          </UserDataBox>}

          <MessageBox>
            <>
              {el.latestMessage && <Text>{el.latestMessage.content}</Text>}
              {el.latestMessage && <Text>{getTime(el.latestMessage.createdAt)}</Text>}
            </>
          </MessageBox>
        </ChatList>
      ))}
    </LeftClient>
  );
};

export default LeftClientBox;
