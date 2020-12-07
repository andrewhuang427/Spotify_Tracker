import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTopSongs } from "../../api/index";
import ProgressBar from "../ui/ProgressBar";
import TopSongsList from "./TopSongsList";

const Wrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #e4e4e4;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const TopSongsContainer = styled.div``;

const ButtonContainer = styled.div`
  margin: 10px auto 30px;
`;
const ChangeTermButton = styled.button`
  background: transparent;
  border: none;
  margin: 10px auto 0;
  font-size: 16px;
  outline: none;
  position: relative;
  transition: 0.3s;
  padding: 10px;
  color: ${(props) => (props.isActive ? "#1db954" : "#e4e4e4")};
  border-bottom: ${(props) => (props.isActive ? "3px solid #1db954" : "")};

  &:hover {
    cursor: pointer;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -3px;
    left: 0;
    background-color: #1db954;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
`;
const getAveragePopularity = (topSongs) => {
  let sum = 0;
  topSongs.map((song) => {
    return (sum += song.popularity);
  });
  return sum / topSongs.length;
};

function TopSongs() {
  const [term, setTerm] = useState("short_term");
  const [topSongs, setTopSongs] = useState([]);

  const averagePopularity = getAveragePopularity(topSongs);

  useEffect(() => {
    const fetchTopSongs = async () => {
      const response = await getTopSongs(term);
      setTopSongs(response.data.items);
    };
    fetchTopSongs();
  }, [term]);

  return (
    <Wrapper>
      <TopSongsContainer>
        <h1>Your Top Tracks</h1>
        <ButtonContainer>
          <ChangeTermButton
            isActive={term === "short_term"}
            className={term === "short_term" ? "active" : ""}
            onClick={() => {
              setTerm("short_term");
            }}
          >
            Last Month
          </ChangeTermButton>
          <ChangeTermButton
            isActive={term === "medium_term"}
            className={term === "medium_term" ? "active" : ""}
            onClick={() => {
              setTerm("medium_term");
            }}
          >
            Last 6 Months
          </ChangeTermButton>
          <ChangeTermButton
            isActive={term === "long_term"}
            className={term === "long_term" ? "active" : ""}
            onClick={() => {
              setTerm("long_term");
            }}
          >
            All Time
          </ChangeTermButton>
        </ButtonContainer>
        <ProgressBar averagePopularity={averagePopularity} />
        <TopSongsList topSongs={topSongs} />
      </TopSongsContainer>
    </Wrapper>
  );
}

export default TopSongs;
