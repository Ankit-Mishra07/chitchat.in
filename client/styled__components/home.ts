import styled from "styled-components";
import { getCookie } from "../src/utils/cookie";
const primary = "#0096FF";
const secondary = "#3AB4F2";
const error = "#FF1E00";
type Props = {
  showNav?: boolean;
  sender?: string;
};
export const HomeBox = styled.div`
  width: 90vw;
  height: 90vh;
  margin: auto;
  border-radius: 10px;
  border: 4px solid lightblue;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 5px;
`;

export const Nav = styled.nav`
  width: 100%;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: lightblue;
  position: relative;
  z-index: 99;
  transition: all 0.9s ease-in-out;

  div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    /* position: absolute;
    z-index: 100;
    top: 0; */
    background-color: lightblue;
    left: 0;
    right: 0;
    @media (max-width: 790px) {
      display: ${(props: Props) => (props.showNav === true ? "flex" : "none")};
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      gap: 30px;
      .chitchatLogo {
        display: none;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-right: 20px;
    }
  }

  @media (max-width: 790px) {
    justify-content: flex-end;
    padding: 0;
  }
`;
export const Hamburger = styled.div`
  padding: 2px;
  background-color: ${primary};
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  color: #fff;
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  @media (max-width: 790px) {
    display: flex;
  }
`;
export const Badge = styled.sup`
  color: white;
  font-size: 14px;
  font-weight: bolder;
  position: absolute;
  background-color:${error};
  width:16px;
  text-align: center;
  justify-content:center;
  top: 0;
  right: -5px;
  outline: none;
  border: none;
  border-radius:50%;
`;

export const SearchBox = styled.div`
  width: 30%;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  @media (max-width: 790px) {
    width: 60%;
  }
`;
export const SearchResultBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: space-between;
  justify-content: center; */
  position: absolute;
  top: 34px;
  left: 0;
  right: 0;
  background-color: #fff;
  height: fit-content;
  max-height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: lightblue;
  }

  div {
    color: ${primary};
    background-color: #fff;
    border-bottom: 1px solid lightgray;
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
`;

export const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor:pointer;
`;

export const HomeClient = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 75vh;
  margin-top: 10px;
`;
export const LeftClient = styled.div`
  border: 1px solid red;
`;
export const RightClient = styled.div`
  border: 1px solid red;
`;

export const ChatList = styled.div`
  width: 95%;
  margin: auto;
  background-color: white;
  border: "1px solid gray";
  border-radius: 2px;
  padding: 5px;

`;

export const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const UserDataBox = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;
export const NoChatBox = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 70vh;
`;
export const NoChatImg = styled.img`
  width: 30%;
  height: 200px;
  border-radius: 20%;
`;
export const MainMessagesBox = styled.div`
  height: 75vh;
  border: 1px solid blue;
  width: 100%;
`;

export const ChatsBox = styled.ul`
  height: 60vh;
  background-color: white;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: lightblue;
  }
`;

export const LiChatsBox = styled.li`
  list-style: none;
  width: fit-content;
  background-color: ${(props: Props) =>
    props.sender === getCookie("chatuser") ? "yellow" : "green"};
  float: ${(props: Props) =>
    props.sender === getCookie("chatuser") ? "right" : "left"};
  margin: 8px;
  border-radius: 6px;
  padding: 6px;
`;
export const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  background-color: lightblue;
  height: 6vh;
  align-items:center;
`;
export const SenderInputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 9vh;
`;
export const SendInput = styled.input`
  width: 75%;
  font-size: 18px;
  outline: none;
  border: none;
  padding: 10px 4px;
`;
export const EmogiBtn = styled.button`
  color: grey;
  font-size: 24px;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
`;