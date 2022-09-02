import styled from "styled-components";

export const Label = styled.label`
  padding: 8px 12px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  box-sizing: border-box;
  color: grey;
  background: #ffffff;
  border-radius: 6px;
  text-transform: capitalize;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span:nth-child(1) {
    border: 1px solid lightgrey;
    padding: 2px;
    border-radius: 5px;
    background-color: #f0f0f0;
  }
`;

