import styled from "styled-components";

export const Post = styled.div`
  width: 100%;
  height: 20rem;
  a {
    color: black;
    transition: color 0.15s ease-in;
    &:hover {
      color: #a7a7a7;
    }
  }
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const H1 = styled.h1``;

export const P = styled.p``;
