import { url } from "../../utils/baseUrl";
import { getCookie } from "../../utils/cookie";

export const POSTChatToSingle = async (chatId: string, content: string) => {
  fetch(`${url}/api/message`, {
    method: "POST",
    body: JSON.stringify({
      chatId,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {});
};
