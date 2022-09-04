
import React, { useEffect, useState } from "react";
import { MyUserType, NotifyType, SearchedUser } from "../../pages/home";
import { GetChatsDetailsOfSingle } from "../../src/Fetch/Chat/GetChatsDetailsOfSingle";
import { MessageType } from "../../src/utils/types";
import { HomeClient } from "../../styled__components/home";
import LeftClientBox from "./LeftClientBox/LeftClientBox";
import RightClientBox from "./RightClientBox/RightClientBox";
type Props = {
  myChats: MyUserType[];
  setFetchAgain: Function;
  notify:NotifyType;
  setNotify:Function;
};
const HomeContent = ({ myChats,setFetchAgain,notify,setNotify }: Props) => {

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [click, setClick] = useState<boolean>(true);
  const [selectChat, setSelectedChat] = useState<any>();
  const getChatDetailsOfSingle = async (chat: Object & { _id: string; users:SearchedUser[] }) => {
    setSelectedChat(chat);
    await GetChatsDetailsOfSingle(chat._id, setMessages);
  };
  useEffect(() => {}, []);
  return (
    <HomeClient>
      <LeftClientBox
        myChats={myChats}
        getChatDetailsOfSingle={getChatDetailsOfSingle}
        click={click}
        setClick={setClick}
        setFetchAgain={setFetchAgain}
      />

      <RightClientBox
        messages={messages}
        setMessages={setMessages}
        click={click}
        setClick={setClick}
        chat={selectChat}
        setFetchAgain={setFetchAgain}
         notify={notify}
        setNotify={setNotify}
      />
    </HomeClient>
  );
};

export default HomeContent;