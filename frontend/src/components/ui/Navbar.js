import React from "react";
import styled from "styled-components";
import LogoImg from "../../images/Spotify_Logo.png";
import { NavbarData } from "./NavbarData";

const Nav = styled.div`
  background-color: #303030;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
`;

const LogoText = styled.h2`
  margin-left: 10px;
  color: white;
`;

const NavbarLinks = styled.ul`
  display: grid;
  grid-template-columns: repeat(${NavbarData.length}, auto);
  grid-gap: 30px;
  list-style: none;
  text-align: center;
  align-items: center;
`;

const NavbarLink = styled.a`
  color: #e4e4e4;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    border: 3px solid #1db954;
    transition: 0.5s;
  }
`;

const NavbarButton = styled.a`
  color: #e4e4e4;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  background-color: #1db954;
  &:hover {
    background-color: #1db9546c;
    transition: 0.5s;
  }
`;

function Navbar() {
  return (
    <Nav>
      <LogoContainer>
        <Logo src={LogoImg} alt="Spotify Logo" />
        <LogoText>| Profile Tracker</LogoText>
      </LogoContainer>
      <NavbarLinks>
        {NavbarData.map((item, index) => {
          return (
            <li key={index}>
              {item.redirect ? (
                <NavbarButton href={item.path}>{item.title}</NavbarButton>
              ) : (
                <NavbarLink href={item.path}>{item.title}</NavbarLink>
              )}
            </li>
          );
        })}
      </NavbarLinks>
    </Nav>
  );
}

export default Navbar;
