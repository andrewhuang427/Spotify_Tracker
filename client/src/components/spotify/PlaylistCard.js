import React from "react";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const PlaylistCardContainer = styled.div`
  background-color: black;
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  padding: 10px;
`;

const PlaylistImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: 10px 10px 0 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  font-size: 30px;

  svg {
    color: #777777;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    opacity: 1;
  }
`;

const DescriptionContainer = styled.div`
  height: 65px;
  padding-left: 10px;
  color: #777777;
`;

function PlaylistCard({ playlist }) {
  return (
    <Wrapper>
      <a
        href={playlist.external_urls.spotify}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "#e4e4e4" }}
      >
        <PlaylistCardContainer>
          <ImageContainer>
            <PlaylistImage
              src={playlist.images[0].url}
              alt="Playlist Cover"
            ></PlaylistImage>
            <Overlay>
              <AiOutlineInfoCircle />
            </Overlay>
          </ImageContainer>
          <DescriptionContainer>
            <h4>{playlist.name}</h4>
          </DescriptionContainer>
        </PlaylistCardContainer>
      </a>
    </Wrapper>
  );
}

export default PlaylistCard;
