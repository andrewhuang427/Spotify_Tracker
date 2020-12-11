import React, { useEffect, useState } from "react";
import { getTopArtists } from "../../api/index";
import ArtistsGrid from "./ArtistsGrid";
import styled from "styled-components";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import ProgressBar from "../ui/ProgressBar";
import { AnimatedButton } from "../styled-components/AnimatedButton";
import { SectionHeading } from "../styled-components/Headings";
import { ButtonContainer } from "../styled-components/Containers";

const TopArtistsContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
  color: "#e4e4e4";
`;

const ToggleButton = styled.button`
  color: #e4e4e4;
  font-size: 50px;
  background: transparent;
  outline: none;
  border: none;
  margin: 0 10px;

  svg {
    padding: 10px;
    border-radius: 50%;
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

  const getAveragePopularity = (artists) => {
    let sum = 0;
    artists.map((artist) => {
      return (sum += artist.popularity);
    });
    return sum / artists.length;
  };

  const averagePopularity = getAveragePopularity(Artists);

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
          <SectionHeading>Your Top Artists and Genres</SectionHeading>
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
          <div
            style={{ width: "90%", marginRight: "auto", marginLeft: "auto" }}
          >
            <ProgressBar averagePopularity={averagePopularity}></ProgressBar>
          </div>
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
