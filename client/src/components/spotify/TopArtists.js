import React, { useEffect, useState } from "react";
import { getTopArtists } from "../../api/index";
import ArtistsGrid from "./ArtistsGrid";
import styled from "styled-components";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { AnimatedButton } from "../styled-components/AnimatedButton";
import { SectionHeading } from "../styled-components/Headings";
import {
  FlexContainer,
  ButtonContainer,
} from "../styled-components/Containers";

const TopArtistsContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
  color: "#e4e4e4";
`;

const HeadingContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1075px) {
    display: block;
  }
`;

const ToggleButton = styled.button`
  color: #e4e4e4;
  font-size: 40px;
  background: transparent;
  outline: none;
  border: none;
  margin: 0 5px;

  svg {
    padding: 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
  }

  svg:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    transition: 0.5s;
  }
`;

const Previous = styled(ToggleButton)``;

const Next = styled(ToggleButton)``;

function TopArtists() {
  const [Artists, setArtists] = useState([]);
  const [term, setTerm] = useState("short_term");
  const [current, setCurrent] = useState(0);

  const numCards = 10;

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
      setArtists(response.data.items);
    };
    fetchArtists();
  }, [term]);
  return (
    <>
      <TopArtistsContainer>
        <div>
          <FlexContainer style={{ margin: "30px 50px" }}>
            <HeadingContainer>
              <SectionHeading>Your Top Artists and Genres</SectionHeading>
              <ButtonContainer style={{ marginTop: "10px" }}>
                <Previous
                  onClick={() => {
                    if (current - numCards >= 0) {
                      setCurrent(current - numCards);
                    }
                  }}
                >
                  <FaAngleLeft />
                </Previous>
                <Next
                  onClick={() => {
                    if (current + numCards <= Artists.length - numCards) {
                      setCurrent(current + numCards);
                    }
                  }}
                >
                  <FaAngleRight />
                </Next>
              </ButtonContainer>
            </HeadingContainer>
            <ButtonContainer>
              <AnimatedButton
                isActive={term === "short_term"}
                className={term === "short_term" ? "active" : ""}
                onClick={() => {
                  setTerm("short_term");
                }}
              >
                Last Month
              </AnimatedButton>
              <AnimatedButton
                isActive={term === "medium_term"}
                className={term === "medium_term" ? "active" : ""}
                onClick={() => {
                  setTerm("medium_term");
                }}
              >
                Last 6 Months
              </AnimatedButton>
              <AnimatedButton
                isActive={term === "long_term"}
                className={term === "long_term" ? "active" : ""}
                onClick={() => {
                  setTerm("long_term");
                }}
              >
                All Time
              </AnimatedButton>
            </ButtonContainer>
          </FlexContainer>
          <ArtistsGrid
            Artists={Artists.slice(current, current + numCards)}
            current={current}
            TopGenres={getTopGenres(Artists)}
          />
        </div>
      </TopArtistsContainer>
    </>
  );
}

export default TopArtists;
