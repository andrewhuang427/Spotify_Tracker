import React, { useState, useEffect } from "react";
import { getPlaylists } from "../../api/index";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import PlaylistCard from "./PlaylistCard";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";

const HeadingContainer = styled.div`
  margin-left: 30px;
  display: flex;
`;

const Heading = styled.h1`
  margin-right: 30px;
`;
function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const size = useWindowSize();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await getPlaylists();
      console.log(response.data.items);
      setPlaylists(response.data.items);
    };
    fetchPlaylists();
  }, []);
  return (
    <div>
      <CarouselProvider
        naturalSlideHeight={120}
        naturalSlideWidth={100}
        totalSlides={playlists.length}
        visibleSlides={size < 900 ? 2 : 4}
      >
        <HeadingContainer>
          <Heading>Your Playlists</Heading>
          <ButtonBack className="toggleButton">
            <FaAngleLeft />
          </ButtonBack>
          <ButtonNext className="toggleButton">
            <FaAngleRight />
          </ButtonNext>
        </HeadingContainer>
        <Slider>
          {playlists.map((playlist, index) => {
            return (
              <Slide index={index}>
                <PlaylistCard playlist={playlist} />
              </Slide>
            );
          })}
        </Slider>
      </CarouselProvider>
    </div>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default Playlists;
