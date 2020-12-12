import React from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPlayCircleOutline } from "react-icons/md";

const ComponentContainer = styled.div`
  background: #000000;
  width: 100%;
  font-size: 10px;
  padding: 10px;
  border-radius: 20px;
  @media (max-width: 900px) {
    padding: 5px;
  }
  overflow: hidden;
`;

const List = styled.ul`
  overflow-x: hidden;
`;

const ListItem = styled.li`
  text-align: left;
`;

const SongAttributesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
  padding: 10px;
  height: 85px;
  border-radius: 10px;
  background: rgb(60, 60, 60, 0.3);

  div {
    display: inline-block;
  }
  @media (max-width: 900px) {
    margin: 10px;
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
  bottom: 15px;
  left: 20px;
`;

const TitleHeading = styled.h1`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ArtistsHeading = styled.h3`
  color: #777777;
  font-size: 14px;
  @media (max-width: 768px) {
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
  color: #777777;
  text-decoration: none;
  font-size: 35px;
  position: relative;
  top: 10px;
  right: 20px;

  svg {
    cursor: pointer;
  }
  svg:hover {
    color: #e4e4e4;
  }

  @media (max-width: 900px) {
    right: 50px;
  }
`;

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
                    </ArtistsHeading>
                  </TitleAndArtists>
                </Left>
                <Right>
                  <PlaySongLink
                    href={song.external_urls.spotify}
                    target="_blank"
                  >
                    <MdPlayCircleOutline />
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
