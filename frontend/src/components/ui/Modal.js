import React from "react";
import styled from "styled-components";
import LoadingGIF from "../../images/Loading_Spinner.gif";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000aa;
  z-index: 99999;
  display: flex;
`;

const Window = styled.div`
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  background: #181818;
  height: auto;
  width: 400px;
`;

const ModalContentContainer = styled.div`
  padding: 0 20px 20px 20px;
  text-align: center;
`;

const PlaylistTitle = styled.h1`
  font-size: 20px;
  margin: 15px auto;
`;

const PlaylistImage = styled.img`
  border-radius: 10px;
  width: 100%;
  object-fit: contain;
`;

const Container = styled.div`
  margin: 10px auto;
`;

const PlaylistLink = styled.a`
  text-decoration: none;
  font-size: 12px;
  background: #1db954;
  padding: 10px 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  color: black;

  &:hover {
    background: #1db954a0;
  }
`;

const LoadingBar = styled.div`
  border-top: 1px solid #777777;
  margin: auto 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  color: #777777;
  font-size: 12px;
`;

const LoadingContentContainer = styled.div`
  padding-top: 8px;
`;

const LoadingImage = styled.img`
  width: 50px;
  height: auto;
  object-fit: contain;
`;

const DoneIconContainer = styled.div`
  padding-top: 8px;
  color: #1db954;
  font-size: 30px;
`;

function Modal({
  setModalOpen,
  setPlaylist,
  playlistLoading,
  playlist,
  currentAction,
}) {
  return (
    <ModalContainer>
      <Window>
        <AiOutlineClose
          style={{ cursor: "pointer" }}
          onClick={() => {
            setModalOpen(false);
            setPlaylist({
              name: "",
              href: "",
              image: "",
            });
          }}
        />
        <ModalContentContainer>
          {playlistLoading ? (
            ""
          ) : (
            <>
              <PlaylistTitle>{playlist.name}</PlaylistTitle>
              <Container>
                <a href={playlist.href}>
                  <PlaylistImage src={playlist.image}></PlaylistImage>
                </a>
              </Container>
              <Container>
                <PlaylistLink href={playlist.href} target="_blank">
                  View Playlist
                </PlaylistLink>
              </Container>
            </>
          )}
        </ModalContentContainer>
        <LoadingBar>
          {playlistLoading ? (
            <>
              <LoadingContentContainer>
                <h3>Loading</h3>
                <div>{currentAction}</div>
              </LoadingContentContainer>
              <LoadingImage src={LoadingGIF} alt="Loading GIF"></LoadingImage>
            </>
          ) : (
            <>
              <LoadingContentContainer>
                <h3>Done</h3>
                <div>Playlist Created Successfully!</div>
              </LoadingContentContainer>
              <DoneIconContainer>
                <AiOutlineCheckCircle />
              </DoneIconContainer>
            </>
          )}
        </LoadingBar>
      </Window>
    </ModalContainer>
  );
}

export default Modal;
