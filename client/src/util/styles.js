import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => (props.secondary ? "transparent" : "#0095f6")};
  border: ${(props) => (props.secondary ? "1px solid #dbdbdb" : "none")};
  cursor: pointer;
  color: ${(props) => (props.secondary ? "#262626" : "white")};
  margin: 2rem 0;
  padding: 5px;
  min-height: 27px;
  /* display: block; */
  /* width: 30%; */
  transition: 0.2s all ease-in;
  &:disabled {
    background: #82c7f5;
    cursor: none;
  }
`;
