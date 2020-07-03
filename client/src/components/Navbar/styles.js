import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;

  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;

  padding: 0 20%;
  background: rgba(var(--d87, 255, 255, 255), 1);
  border-bottom: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  @media only screen and (max-width: 991px) {
    padding: 0 10%;
  }
`;

export const NavLogo = styled.div`
  font-family: "Grand Hotel", cursive;
  font-size: 40px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    margin: 0 4rem;

    text-decoration: none;
    color: inherit;
    @media only screen and (max-width: 991px) {
      margin: 0 2rem;
    }
    @media only screen and (max-width: 640px) {
      margin: 0 1rem;
    }
  }
`;
