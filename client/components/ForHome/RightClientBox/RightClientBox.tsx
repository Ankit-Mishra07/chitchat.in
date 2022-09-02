import React, { useEffect, useState } from "react";
import { MessageType } from "../../../src/utils/types";
import { Button } from "../../../styled__components/common";
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
} from "../../../styled__components/home";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { io, Socket } from "socket.io-client";
import { url } from "../../../src/utils/baseUrl";
import { getCookie } from "../../../src/utils/cookie";
import { toast } from "react-toastify";
let socket: any, chatCompare: Object & { _id: string };
type Props = {
  messages: MessageType[];
  setMessages: Function;
  click: boolean;
  setClick: Function;
  chatId: Object & { _id: string };
};


const RightClientBox = ({
  messages,
  setMessages,
  click,
  setClick,
  chatId,
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
    GetChatsDetailsOfSingle();
    chatCompare = chatId;
  }, [chatId]);


  useEffect(() => {
    socket.on(
      "message recieved",
      (newmsg: Object & { chat: { _id: string } }) => {
        
        if (!chatCompare || chatCompare._id !== newmsg.chat._id) {
          // Todo Notification
          console.log("Notify")
          // toast.error("Notify");
        } else {
          setMessages([...messages, newmsg]);
        }
      }
    );
  });

  const POSTChatToSingle = async () => {
    fetch(`${url}/api/message`, {
      method: "POST",
      body: JSON.stringify({
        chatId: chatId._id,
        content: val,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        socket.emit("new message", res);
        setMessages([...messages, res]);
        setVal("")
      });
  };

  const GetChatsDetailsOfSingle = async () => {
    if (click === false) {
      try {
        let res = await fetch(`${url}/api/message/${chatId._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        });
        let message = await res.json();
        setMessages([...message]);
        socket.emit("join chat", chatId._id);
      } catch (error: any) {
        console.log("error", error);
        // toast.error(error.message);
      }
    }
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
          <ProfileBox></ProfileBox>
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
