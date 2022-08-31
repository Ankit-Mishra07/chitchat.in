import React, { useReducer, useState } from "react";
import {
  Button,
  FlexBox,
  Form,
  H1,
  Input,
  Text,
} from "../../styled__components/common";
import Logo from "../Logo/Logo";

type User = {
  email: string;
  password: string;
};
type Props = {
  setShowRegister: Function;
};
const Login = ({ setShowRegister }: Props) => {
  const [form, setForm] = useState<User>({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    let { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  return (
    <Form>
      <div style={{ textAlign: "center" }}>
        <Logo />
      </div>
      <H1>Login</H1>

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

      <br />
      <FlexBox style={{ width: "100%" }}>
        <Text
          onClick={() => setShowRegister(true)}
          style={{ cursor: "pointer" }}
        >
          Create an account
        </Text>
        <Button>Login</Button>
      </FlexBox>
    </Form>
  );
};

export default Login;
