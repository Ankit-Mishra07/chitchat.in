
import React, { useEffect, useState } from "react";
import { MyUserType } from "../../pages/home";
import { GetChatsDetailsOfSingle } from "../../src/Fetch/Chat/GetChatsDetailsOfSingle";
import { MessageType } from "../../src/utils/types";
import { HomeClient } from "../../styled__components/home";
import LeftClientBox from "./LeftClientBox/LeftClientBox";
import RightClientBox from "./RightClientBox/RightClientBox";
type Props = {
  myChats: MyUserType[];
};
const HomeContent = ({ myChats }: Props) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [click, setClick] = useState<boolean>(true);
  const [chatid, setChatid] = useState<Object & { _id: string }>({ _id: "" });
  const getChatDetailsOfSingle = async (chat: Object & { _id: string }) => {
    setChatid(chat);
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
      />

      <RightClientBox
        messages={messages}
        setMessages={setMessages}
        click={click}
        setClick={setClick}
        chatId={chatid}
      />
    </HomeClient>
  );
};

export default HomeContent;