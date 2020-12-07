import React, { useEffect, useState } from "react";
import { getTopArtists } from "../../api/index";
import ArtistsGrid from "./ArtistsGrid";
import styled from "styled-components";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const TopArtistsContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
  color: "#e4e4e4";
`;

const ButtonContainer = styled.div`
  margin: 10px auto;
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

const ToggleButton = styled.button`
  color: #e4e4e4;
  font-size: 50px;
  background: transparent;
  outline: none;
  border: none;
  margin: 0 10px;

  svg {
    padding 10px;
    border-radius: 50%;
  }

  svg:hover {
    cursor: pointer;
    background : rgba(255,255,255,0.2);
    transition: 0.5s;
  }
`;

const Previous = styled(ToggleButton)``;

const Next = styled(ToggleButton)``;

function TopArtists() {
  const [Artists, setArtists] = useState([]);
  const [term, setTerm] = useState("short_term");
  const [current, setCurrent] = useState(0);

  const getTopGenres = (artists) => {
    let genres = {};
    artists.forEach((artist) => {
      let artistGenres = artist.genres;
      artistGenres.forEach((genre) => {
        if (genre in genres) {
          genres[genre] += 1;
        } else {
          genres[genre] = 1;
        }
      });
    });
    const sorted = Object.fromEntries(
      Object.entries(genres).sort((a, b) => {
        let x = b[1] > a[1] ? 1 : -1;
        return x;
      })
    );
    return sorted;
  };

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await getTopArtists(term);
      console.log(response.data.items);
      setArtists(response.data.items);
    };
    fetchArtists();
  }, [term]);
  return (
    <>
      <TopArtistsContainer>
        <div>
          <h1>Top Artists and Genres</h1>
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
          <ButtonContainer>
            <Previous
              onClick={() => {
                if (current - 10 >= 0) {
                  setCurrent(current - 10);
                }
              }}
            >
              <FaAngleLeft />
            </Previous>
            <Next
              onClick={() => {
                if (current + 10 <= Artists.length - 1) {
                  setCurrent(current + 10);
                }
              }}
            >
              <FaAngleRight />
            </Next>
          </ButtonContainer>
          <ArtistsGrid
            Artists={Artists.slice(current, current + 10)}
            current={current}
            TopGenres={getTopGenres(Artists)}
          />
        </div>
      </TopArtistsContainer>
    </>
  );
}

export default TopArtists;
