import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { registerReq } from "../../src/Fetch/Auth/POSTreq";
import {
  Button,
  FlexBox,
  Form,
  H1,
  Input,
  Text,
} from "../../styled__components/common";
import { Label } from "../../styled__components/register";
import Logo from "../Logo/Logo";
import { registerValidator } from "./RegisterValidator";
type User = {
  name: string;
  email: string;
  password: string;
  profile_avatar: string;
  confirmPassword?: string;
};
type Props = {
  setShowRegister: Function;
};
const Register = ({ setShowRegister }: Props) => {
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_avatar: "",
  });
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let val = registerValidator(form);
    if (val) {
      await registerReq({ ...form }, setShowRegister);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ textAlign: "center" }}>
        <Logo />
      </div>
      <H1>Register</H1>
      <Input
        type={"text"}
        placeholder="Enter your name"
        name="name"
        w="100%"
        value={form.name}
        onChange={(e) => handleChange(e)}
        required
      />
      <Input
        type={"email"}
        placeholder="Enter your email address"
        w="100%"
        name="email"
        value={form.email}
        onChange={(e) => handleChange(e)}
        required
      />

      <Input
        type={"password"}
        placeholder="Enter password"
        name="password"
        w="100%"
        value={form.password}
        onChange={(e) => handleChange(e)}
        required
      />
      <Input
        type={"password"}
        placeholder="Confirm password"
        w="100%"
        value={form.confirmPassword}
        onChange={(e) => handleChange(e)}
        name="confirmPassword"
        required
      />
      <Label htmlFor="file_input">
        <span>Browse your profile pic</span>
        <span style={{ textAlign: "right", display: "inline-block" }}>
          loading...
        </span>
      </Label>
      <Input
        id="file_input"
        type={"file"}
        accept="image/png, image/jpeg, image/jpg"
        w="100%"
        style={{ display: "none" }}
        name="profile_avatar"
        value={form.profile_avatar}
        onChange={(e) => handleChange(e)}
      />
      <br />
      <FlexBox style={{ width: "100%" }}>
        <Text
          onClick={() => setShowRegister(false)}
          style={{ cursor: "pointer" }}
        >
          Already have an account?
        </Text>
        <Button type="submit">Register</Button>
      </FlexBox>
    </Form>
  );
};

export default Register;