import { toast } from "react-toastify";
import { MyUserType } from "../../../pages/home";
import { url } from "../../utils/baseUrl";
import { getCookie } from "../../utils/cookie";

export const addUserReq = (
  userId: string,
  setMyUsers: Function,
  getMyusers: Function
) => {
  fetch(`${url}/api/chat`, {
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      //TODO: list out messages on right side of this chat id
      getMyusers(setMyUsers);
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export const getMyusers = async (setMyUsers: Function) => {
  await fetch(`${url}/api/chat`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setMyUsers([...res]);
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
