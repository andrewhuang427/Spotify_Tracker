import React from "react";
import styled from "styled-components";

const ComponentContainer = styled.div`
  background: #000000;
  width: 100%;
  font-size: 10px;
  padding: 10px;
  border-radius: 20px;
`;

const List = styled.ul`
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(0, 0, 0);
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: rgb(255, 255, 255);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: rgb(255, 255, 255, 0.3);
  }
`;

const ListItem = styled.li`
  text-align: left;
`;

const SongAttributesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
  padding: 10px;
  height: 90px;
  border-radius: 10px;
  background: rgb(60, 60, 60, 0.3);

  div {
    display: inline-block;
  }
`;

const Left = styled.div``;

const RankContainer = styled.div`
  position: relative;
  text-align: center;
  margin: auto 20px;
  bottom: 25px;
`;

const RankHeading = styled.h1`
  font-size: 16px;
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const TitleAndArtists = styled.div`
  position: relative;
  bottom: 10px;
  left: 20px;
`;

const TitleHeading = styled.h1`
  font-size: 16px;
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const ArtistsHeading = styled.h3`
  color: #777777;
  @media (max-width: 900px) {
    font-size: 10px;
  }
`;

const Right = styled.div`
  text-align: center;
  @media (max-width: 900px) {
    width: 0;
  }
`;

const PlaySongLink = styled.a`
  color: #e4e4e4;
  text-align: center;
  padding: 10px 20px;
  background: #1db954;
  border-radius: 5px;
  text-decoration: none;
  font-size: 15px;
  position: relative;
  top: 20px;
  right: 10px;

  &:hover {
    background: #1db954a0;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const msToMinutes = (timeInMilliseconds) => {
  let ms = timeInMilliseconds;
  ms = 1000 * Math.round(ms / 1000); // round to nearest second
  var d = new Date(ms);
  return (
    d.getUTCMinutes() +
    ":" +
    `${d.getUTCSeconds() > 9 ? d.getUTCSeconds() : "0" + d.getUTCSeconds()}`
  );
};
function TopSongsList({ topSongs }) {
  return (
    <ComponentContainer>
      <List>
        {topSongs.map((song, index) => {
          return (
            <ListItem key={index}>
              <SongAttributesContainer>
                <Left>
                  <RankContainer>
                    <RankHeading>{index + 1 + ". "}</RankHeading>
                  </RankContainer>
                  <img
                    src={
                      song.album.images !== undefined
                        ? song.album.images[2].url
                        : ""
                    }
                    alt="Album Cover"
                  ></img>
                  <TitleAndArtists>
                    <TitleHeading>{song.name}</TitleHeading>
                    <ArtistsHeading>
                      {song.artists.map((artist, index) => {
                        return `${artist.name}${
                          song.artists[index + 1] ? ", " : ""
                        }`;
                      })}
                      {" | Popularity Score: "}
                      {song.popularity}
                      {" | Duration: "}
                      {msToMinutes(song.duration_ms)}
                    </ArtistsHeading>
                  </TitleAndArtists>
                </Left>
                <Right>
                  <PlaySongLink
                    href={song.external_urls.spotify}
                    target="_blank"
                  >
                    Play
                  </PlaySongLink>
                </Right>
              </SongAttributesContainer>
            </ListItem>
          );
        })}
      </List>
    </ComponentContainer>
  );
}
export default TopSongsList;
