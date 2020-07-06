import styled from "styled-components";

export const Posts = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
  }
`;

export const Post = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  width: 30%;
  margin-bottom: 1.5rem;
  width: 30%;
  height: 200px;

  padding: 0.1rem;
  /* border: 1px solid #757575; */

  background: white;

  .username {
    height: fit-content;
    transition: color 0.15s ease-in;
    &:hover {
      color: #a7a7a7;
    }
  }

  @media only screen and (max-width: 991px) {
    height: 175px;
  }
  @media only screen and (max-width: 720px) {
    height: 150px;
  }
`;

export const PostImage = styled.div`
  width: 75%;
  height: ${(props) => (props.profile ? "100%" : "85%")};
  margin: 0 auto;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export const PostTitle = styled.h3`
  text-align: center;
`;

export const PostCaption = styled.p``;
