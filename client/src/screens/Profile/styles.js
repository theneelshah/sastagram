import styled from "styled-components";

export const Container = styled.div``;

export const Details = styled.div`
  display: flex;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
`;

export const PictureHolder = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const ProfilePicture = styled.div`
  flex: 1;
  @media only screen and (max-width: 720px) {
    padding-right: 5px;
  }
`;

export const ProfileDetails = styled.div`
  flex: 2;
  @media only screen and (max-width: 720px) {
    padding-left: 5px;
  }
`;

export const ButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  button {
    flex: 1;
    margin: 2rem 0.5rem;
    a {
      text-decoration: none;
      color: inherit;
    }
  }
  @media only screen and (max-width: 720px) {
    flex-direction: column;
    button {
      margin: 5px 0;
    }
  }
`;
export const Img = styled.img`
  cursor: pointer;
`;
