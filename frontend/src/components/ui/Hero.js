import React from "react";
import styled from "styled-components";
import User from "../spotify/User";

const HeroContainer = styled.div`
  margin-top: 80px;
  margin-bottom: -50px;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: center;
  background: #000000;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  width: 80%;
  color: #e4e4e4;
`;

const WelcomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 50%;
  height: 450px;

  @media screen and (max-width: 900px) {
    max-width: 100%;
  }
`;

const WelcomeHeading = styled.h3`
  margin-bottom: 5px;
`;

const WelcomeSubtitle = styled.div``;

const SubtitleHeader = styled.h1`
  color: #1db954;
  font-size: 60px;
  margin-bottom: 20px;

  @media screen and (max-width: 900px) {
    font-size: 50px;
  }
`;
const WelcomeDescription = styled.p``;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 50%;
  height: 450px;
  margin: 60px 30px 40px 50px;
  background: rgb(60, 60, 60, 0.3);
  border-radius: 15%;
`;

function Header() {
  return (
    <HeroContainer>
      <HeroContent>
        <ContentWrapper>
          <WelcomeContainer>
            <div>
              <WelcomeHeading>Welcome, ahuang2000</WelcomeHeading>
              <WelcomeSubtitle>
                <SubtitleHeader>Your Spotify Data Visualized</SubtitleHeader>
              </WelcomeSubtitle>
              <WelcomeDescription>
                Use this application to learn more about your music taste.
                Visualize your Top Artists, Most Played Songs, and more
              </WelcomeDescription>
            </div>
          </WelcomeContainer>
          {/* <Profile>
            <User />
          </Profile> */}
        </ContentWrapper>
      </HeroContent>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#000000"
          fillOpacity="1"
          d="M0,128L60,149.3C120,171,240,213,360,213.3C480,213,600,171,720,138.7C840,107,960,85,1080,74.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </HeroContainer>
  );
}

export default Header;
