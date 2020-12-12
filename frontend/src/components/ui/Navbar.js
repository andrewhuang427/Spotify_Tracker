import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../../images/Spotify_Logo.png";
import { NavbarData } from "./NavbarData";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Nav = styled.div`
  background-color: #303030;
  border-bottom: 1px solid #555555;
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
  font-size: 18px;
  margin-left: 10px;
  color: white;
`;

const NavbarLinks = styled.ul`
  display: grid;
  grid-template-columns: repeat(${NavbarData.length}, auto);
  grid-gap: 8px;
  list-style: none;
  text-align: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background: #000000;
    z-index: 9999;
    padding: 20px;
    border-bottom: 1px solid #555555;
  }
`;

const ListItem = styled.li`
  padding: 5px 10px;
  border-bottom: ${(props) => (props.isActive ? "3px solid #1db954" : "")};

  @media screen and (max-width: 900px) {
    display: flex;
    justify-content: center;
    margin: 10px auto;
    border-bottom: none;
  }
`;
const NavLink = styled(Link)`
  color: ${(props) => (props.isActive ? "#1db954" : "#e4e4e4")};
  display: flex;
  text-align: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

const Bars = styled(FaBars)`
  display: none;
  color: #e4e4e4;

  &:hover {
    color: #e4e4e4aa;
  }
  @media screen and (max-width: 900px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

function Navbar() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isOpen, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!isOpen);
  };
  return (
    <Nav>
      <LogoContainer>
        <Logo src={LogoImg} alt="Spotify Logo" />
        <LogoText>| Profile Tracker</LogoText>
      </LogoContainer>
      <NavbarLinks isOpen={isOpen} onClick={toggleSidebar}>
        {NavbarData.map((item, index) => {
          return (
            <ListItem isActive={currentPage === item.title} key={index}>
              <NavLink
                to={item.path}
                isActive={currentPage === item.title}
                key={index}
                onClick={() => setCurrentPage(item.title)}
              >
                {item.title}
              </NavLink>
            </ListItem>
          );
        })}
      </NavbarLinks>
      <Bars onClick={toggleSidebar} />
    </Nav>
  );
}

export default Navbar;
