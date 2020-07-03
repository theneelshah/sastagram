import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

class Toast extends Component {
  render() {
    const { text, type } = this.props;
    return (
      <ToastHolder type={type}>
        <h1>{text}</h1>
      </ToastHolder>
    );
  }
}

const showAnimation = keyframes`
  0% {
    opacity: 0;

  }  100% {
    opacity: 1;

  }
`;

const selectColor = (props) => {
  switch (props.type) {
    case "danger":
      return "#f32013";
      break;
    case "success":
      return "#4a934a";
      break;
    default:
      return "#60AC9C";
  }
};

const ToastHolder = styled.div`
  opacity: 1;
  background: ${(props) => selectColor(props)};
  color: white;
  transition: all 0.5s ease-in;
  animation: ${showAnimation} 0.5s ease-in;
  text-align: center;
  box-shadow: 3px 3px 9px 0px rgba(0, 0, 0, 0.75);
`;

export default Toast;
