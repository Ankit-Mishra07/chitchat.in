import { toast } from "react-toastify";

type User = {
  name: string;
  email: string;
  password: string;
  profile_avatar: string;
  confirmPassword?: string;
};

export const registerValidator = (form: User) => {
  if (form.name === "") {
    toast.error("Username is missing 🤷‍♂️");
    return false;
  }
  if (form.email === "") {
    toast.error("Email is missing 🤷‍♂️");
    return false;
  }
  if (form.password.length < 6) {
    toast.error("Password should have atleast 6 character 🤷‍♂️");
    return false;
  }
  if (form.password !== form.confirmPassword) {
    toast.error("Password and confirm password is not matching 🤷‍♂️");
    return false;
  }
  return true;
};