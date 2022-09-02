
import { toast } from "react-toastify";

type User = {
  email: string;
  password: string;
};
export const ValidateLogin = (form: User) => {
  if (form.email === "") {
    toast.error("Email is missing 🤷‍♂️");
    return false;
  }
  if (form.password.length < 6) {
    toast.error("Password should have atleast 6 character 🤷‍♂️");
    return false;
  }
  return true;
};

