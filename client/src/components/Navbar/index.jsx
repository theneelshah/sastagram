import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../auth";
import { Nav, NavLinks, NavLogo } from "./styles";

const CurrentLinks = () => {
  if (isLoggedIn())
    return (
      <>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/profile">Profile</Link>
      </>
    );

  return (
    <>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </>
  );
};
const Navbar = () => {
  return (
    <Nav>
      <NavLogo>
        <Link to="/"> Sastagram </Link>
      </NavLogo>
      <NavLinks>
        <CurrentLinks />
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
