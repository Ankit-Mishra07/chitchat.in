import styled from "styled-components";
const primary = "#0096FF";
const secondary = "#3AB4F2";
const error = "#FF1E00";
interface Props {
  error?: Error;
  w?: string;
  direction?: string;
  justify?: string;
  align?: string;
  color?: string;
}
export const Button = styled.button`
  font-size: 18px;
  padding: 12px 18px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: ${(props: Props) => (props.error ? error : primary)};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  color: white;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    background-color: ${secondary};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  box-sizing: border-box;
`;
export const Input = styled.input`
  outline: none;
  background: none;
  border: none;
  padding: 8px 12px;
  font-size: 18px;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  box-sizing: border-box;
  color: grey;
  background: #ffffff;
  border-radius: 6px;
  &:focus {
    border-bottom: 2px solid ${secondary};

    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  &::placeholder {
    color: lightgray;
  }
  width: ${(props: Props) => props.w};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  gap: 12px;
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 425px) {
    width: 95%;
  }
`;
export const H1 = styled.h1`
  font-size: 32px;
  text-align: center;
  color: gray;
`;

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props: Props) =>
    props.direction ? props.direction : "row"};
  justify-content: ${(props: Props) =>
    props.justify ? props.justify : "space-between"};
  align-items: ${(props: Props) => (props.align ? props.align : "center")};
`;
export const Text = styled.p`
  font-size: 16px;
  color: ${(props: Props) => (props.color ? props.color : primary)};
`;

export const Box = styled.div`
  display: block;
  box-sizing: border-box;
`;

export const MainBox = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
`;

