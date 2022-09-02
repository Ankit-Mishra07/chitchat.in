import { toast } from "react-toastify";
import { url } from "../../utils/baseUrl";
import { getCookie } from "../../utils/cookie";


export const searchUserwithParam = async (
  param: string,
  setSearchUser: Function
) => {
  await fetch(`${url}/auth/user/allusers?search=${param}`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.length === 0) {
        toast.error("No user found with this username");
      } else {
        setSearchUser(res);
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
