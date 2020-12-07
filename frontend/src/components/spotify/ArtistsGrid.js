import React from "react";
import styled from "styled-components";
import ArtistCard from "./ArtistCard";
import Genres from "./Genres";

// https://codepen.io/andrewhuang427/pen/oNzxooB

const GridComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 325px);
  gap: 1rem;
  margin: auto 15px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

function ArtistsGrid({ Artists, current, TopGenres }) {
  return (
    <GridComponent>
      <Genres Genres={TopGenres}></Genres>
      {Artists.map((artist, index) => (
        <ArtistCard
          key={index}
          artist={artist}
          rank={index + current + 1}
        ></ArtistCard>
      ))}
    </GridComponent>
  );
}

export default ArtistsGrid;
