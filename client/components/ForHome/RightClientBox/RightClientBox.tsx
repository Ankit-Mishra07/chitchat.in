import React, { useEffect, useState } from "react";
import { MessageType, SearchedUser } from "../../../src/utils/types";
import { Button, Text } from "../../../styled__components/common";
import { BsThreeDotsVertical } from "react-icons/bs"
import {
  ChatsBox,
  EmogiBtn,
  LiChatsBox,
  MainMessagesBox,
  MessageBox,
  NoChatBox,
  NoChatImg,
  ProfileBox,
  RightClient,
  SenderInputBox,
  SendInput,
  UserImage,
} from "../../../styled__components/home";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { io, Socket } from "socket.io-client";
import { url } from "../../../src/utils/baseUrl";
import { getCookie } from "../../../src/utils/cookie";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { getName, getProfile } from "../../../src/utils/logic";
import { NotifyType } from "../../../pages/home";
let socket: any, chatCompare: any;
type Props = {
  messages: MessageType[];
  setMessages: Function;
  click: boolean;
  setClick: Function;
  setFetchAgain:Function;
  chat: any;
  notify:NotifyType;
  setNotify:Function;
};


const RightClientBox = ({
  messages,
  setMessages,
  click,
  setClick,
  setFetchAgain,
  chat,
  notify,
  setNotify

}: Props) => {
  const [val, setVal] = useState<string>("");
  const [connect, setConnect] = useState<boolean>(false);

  useEffect(() => {
    socket = io(`${url}`);
    socket.emit("setup", getCookie("chatuser"));
    socket.on("connected", () => {
      setConnect(true);
    });
  }, []);

  useEffect(() => {
    const GetChatsDetailsOfSingle = async () => {
      if (click === false) {
        try {
          let res = await fetch(`${url}/api/message/${chat._id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          });
          let message = await res.json();
          setMessages([...message]);
          socket.emit("join chat", chat._id);
        } catch (error: any) {
          console.log("error", error);
        }
      }
    };

    GetChatsDetailsOfSingle();
    chatCompare = chat;
  }, [chat]);


  useEffect(() => {
    socket.on(
      "message recieved",
      (newmsg: Object & { chat: { _id: string } }) => {

        if (!chatCompare || chatCompare._id !== newmsg.chat._id) {
          // Todo Notification
          setNotify({length:notify.messages.length+1,messages:[...notify.messages,newmsg]})
          setFetchAgain((prev:boolean) => !prev)
        } else {
          setMessages([...messages, newmsg]);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const POSTChatToSingle = async () => {
    fetch(`${url}/api/message`, {
      method: "POST",
      body: JSON.stringify({
        chatId: chat._id,
        content: val,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        socket.emit("new message", res);
        setMessages([...messages, res]);
        setVal("")
      });
  };


  return (
    <RightClient>
      {click && (
        <NoChatBox>
          <NoChatImg src="/addchat.jpg" alt="addchat" />
        </NoChatBox>
      )}

      {!click && (
        <MainMessagesBox>
          <ProfileBox>
            <Box display={"flex"} gap={"20px"} alignItems={"center"}>
              <UserImage src={getProfile(chat)} alt="myprofile" onClick={() => {
                // Open a Modal with bigger user image an username 


              }} />
              <Text>{chat.isGroupChat?chat.chatName:getName(chat)}</Text>
            </Box>

            <BsThreeDotsVertical fontSize={"20px"} cursor={"pointer"} />
          </ProfileBox>
          <ChatsBox>
            {messages.map((elem) => (
              <div key={elem._id} style={{ width: "100%" }}>
                <LiChatsBox sender={elem.sender._id}>{elem.content}</LiChatsBox>
              </div>
            ))}
          </ChatsBox>
          <SenderInputBox>
            <EmogiBtn>
              <BsEmojiLaughing />
            </EmogiBtn>
            <EmogiBtn>
              <IoDocumentAttachOutline />
            </EmogiBtn>
            <SendInput
              placeholder="Message..."
              onChange={(e) => {
                setVal(e.target.value);
              }}
              value={val}
            />
            <Button
              onClick={() => {
                if (val) {
                  POSTChatToSingle();
                }
              }}
            >
              <AiOutlineSend />
            </Button>
          </SenderInputBox>
        </MainMessagesBox>
      )}
    </RightClient>
  );
};

export default RightClientBox;
