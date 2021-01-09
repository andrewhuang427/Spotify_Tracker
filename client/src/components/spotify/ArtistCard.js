import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 30px;
  width: 100%;
  background: black;
  border-radius: 10px;
`;

const ArtistCardContainer = styled.div`
  width: 100%;
`;

const NameContainer = styled.div`
  text-align: left;
  color: white;
  margin-bottom: 5px;
`;

const GenresContainer = styled.div`
  text-align: left;
  font-size: 12px;
  color: #777777;
  margin-bottom: 5px;
  height: 35px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ArtistImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

function ArtistCard({ artist, rank }) {
  return (
    <Wrapper>
      <ArtistCardContainer>
        <NameContainer>{rank + ". " + artist.name}</NameContainer>
        <GenresContainer>
          {artist.genres.map((genre, index) => {
            return `${genre}${artist.genres[index + 1] ? ", " : ""}`;
          })}
        </GenresContainer>
        <ImageContainer>
          <ArtistImage src={artist.images[0].url}></ArtistImage>
        </ImageContainer>
      </ArtistCardContainer>
    </Wrapper>
  );
}

export default ArtistCard;
