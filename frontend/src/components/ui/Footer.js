import React from "react";
import styled from "styled-components";
import {
  AiFillGithub,
  AiOutlineInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const FooterContainer = styled.div`
  width: 100%;
`;

const FooterDiv = styled.div`
  color: white;
  background-color: #000000;
  margin-top: -10px;
  text-align: center;
  padding: 30px;
`;

const IconsListContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const IconsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 20px;
  list-style: none;
  text-align: center;
  align-items: center;
  font-size: 60px;

  svg {
    padding 10px;
    border-radius: 50%;
  }

  svg:hover {
    cursor: pointer;
    background : rgba(255,255,255,0.3);
  }
`;

const FooterTextContainer = styled.div`
  font-size: 10px;
`;

function Footer() {
  return (
    <FooterContainer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0000000"
          fillOpacity="1"
          d="M0,160L60,149.3C120,139,240,117,360,138.7C480,160,600,224,720,245.3C840,267,960,245,1080,224C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <FooterDiv>
        <IconsListContainer>
          <IconsList>
            <li>
              <AiFillGithub />
            </li>
            <li>
              <AiFillLinkedin />
            </li>
            <li>
              <AiOutlineInstagram />
            </li>
          </IconsList>
        </IconsListContainer>
        <FooterTextContainer>
          Designed with care by Andrew Huang for CSE 330 @ WashU
        </FooterTextContainer>
      </FooterDiv>
    </FooterContainer>
  );
}

export default Footer;
