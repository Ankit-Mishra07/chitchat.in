import { toast } from "react-toastify";
import { url } from "../../utils/baseUrl";
import { getCookie } from "../../utils/cookie";

export const POSTGroupChat = async (users: string[], name: string,setFetchAgain:Function,handleClose:Function) => {
  fetch(`${url}/api/chat/group`, {
    method: "POST",
    body: JSON.stringify({
      users,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if(res.status > 201) {
        toast.error(res.message)
      }
      else {
        setFetchAgain((prev: boolean) => !prev)
        handleClose()
      }
    })
    .catch(error => console.log(error));
};
