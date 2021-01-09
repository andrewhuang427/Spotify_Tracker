import React, { useState, useEffect } from "react";
import styled from "styled-components";
import User from "../spotify/User";
import { getUser } from "../../api/index";

const HeroContainer = styled.div`
  margin: 80px auto 30px auto;
  /* margin-bottom: -50px; */
`;

const HeroContent = styled.div`
  display: flex;
  padding: 50px 0;
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
  height: auto;
  margin: 60px 30px 40px 50px;
  background: rgb(60, 60, 60, 0.3);
  border-radius: 15%;

  @media screen and (max-width: 900px) {
    max-width: 100%;
    margin: 10px;
  }
`;

function Hero() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user.data);
    };
    fetchUser();
  }, []);
  return (
    <HeroContainer>
      <HeroContent>
        <ContentWrapper>
          <WelcomeContainer>
            <div>
              <WelcomeHeading>Welcome, {user.display_name}</WelcomeHeading>
              <WelcomeSubtitle>
                <SubtitleHeader>Your Spotify Data Visualized</SubtitleHeader>
              </WelcomeSubtitle>
              <WelcomeDescription>
                Use this application to learn more about your music taste.
                Visualize your Top Artists, Most Played Songs, and more
              </WelcomeDescription>
            </div>
          </WelcomeContainer>
          <Profile>
            <User user={user} />
          </Profile>
        </ContentWrapper>
      </HeroContent>
    </HeroContainer>
  );
}

export default Hero;
