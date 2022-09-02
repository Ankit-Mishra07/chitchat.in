import { toast } from "react-toastify";
import { url } from "../../utils/baseUrl";
import { getCookie } from "../../utils/cookie";
import { MessageType } from "../../utils/types";

export const GetChatsDetailsOfSingle = async (
  chatId: string,
  setMessages: Function
) => {
  try {
    let res = await fetch(`${url}/api/message/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    let message = await res.json();
    setMessages([...message]);
  } catch (error: any) {
    toast.error(error.message);
  }
};
