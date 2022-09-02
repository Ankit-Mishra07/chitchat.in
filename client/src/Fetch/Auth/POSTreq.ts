import Router, { NextRouter } from "next/dist/shared/lib/router/router";
import { toast } from "react-toastify";
import { url } from "../../utils/baseUrl";
import { setCookie } from "../../utils/cookie";

type User = {
  name: string;
  email: string;
  password: string;
  profile_avatar?: string;
  confirmPassword?: string;
};
type Body = {
  username: string;
  password: string;
  email: string;
};
export const registerReq = async (payload: User, setShowRegister: Function) => {
  payload.profile_avatar = payload.profile_avatar
    ? payload.profile_avatar
    : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  await fetch(`${url}/auth/user/register`, {
    method: "POST",
    body: JSON.stringify({
      username: payload.name,
      password: payload.password,
      email: payload.email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.status > 201) {
        toast.error(res.message);
        console.log(res);
        return;
      }
      setShowRegister(false);
      toast.success(res.message);
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

type LoginUser = {
  email: string;
  password: string;
};

export const loginReq = async (payload: LoginUser, router: NextRouter) => {
  await fetch(`${url}/auth/user/login`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        setCookie("chatuser", res.user._id);
        setCookie("token", res.token);
        toast.success("Logged in successfully");
        router.push("/home");
      } else {
        toast.error(res.message);
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
