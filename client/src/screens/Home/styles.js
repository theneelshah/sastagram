import styled from "styled-components";

export const Card = styled.div`
  position: relative;

  margin: 5rem auto;
  padding: 1.5rem;
  background: rgba(var(--d87, 255, 255, 255), 1);
  li {
    margin-left: 50px;
  }
  .sastagram {
    font-family: "Grand Hotel", cursive;
  }
  @media only screen and (max-width: 991px) {
    h1 {
      text-align: center;
    }
  }
`;
