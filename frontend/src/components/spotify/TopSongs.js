import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getTopSongs,
  createPlaylist,
  addSongsToPlaylist,
  getPlaylist,
} from "../../api/index";
import { sleep } from "../../utils/index";
import ProgressBar from "../ui/ProgressBar";
import TopSongsList from "./TopSongsList";
import LoadingGIF from "../../images/Loading_Spinner.gif";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import { AnimatedButton } from "../styled-components/AnimatedButton";
import { Button } from "../styled-components/Button";
import { SectionHeading } from "../styled-components/Headings";
import { ButtonContainer } from "../styled-components/Containers";

const Wrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #e4e4e4;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const TopSongsContainer = styled.div``;

const CreatePlaylistButton = styled.button`
  cursor: pointer;
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

const Modal = styled.div`
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

function TopSongs() {
  const [term, setTerm] = useState("short_term");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [playlist, setPlaylist] = useState({
    name: "",
    href: "",
    image: "",
  });
  const [topSongs, setTopSongs] = useState([]);

  const getAveragePopularity = (topSongs) => {
    let sum = 0;
    topSongs.map((song) => {
      return (sum += song.popularity);
    });
    return sum / topSongs.length;
  };

  const averagePopularity = getAveragePopularity(topSongs);

  useEffect(() => {
    const fetchTopSongs = async () => {
      const response = await getTopSongs(term);
      setTopSongs(response.data.items);
    };
    fetchTopSongs();
  }, [term]);

  const handleCreatingPlaylist = () => {
    setModalOpen(true); // display's modal
    setPlaylistLoading(true); // display's loading gif / content
    setCurrentAction("Creating Playlist...");
    let playlistId = "";

    createPlaylist(term).then((response) => {
      playlistId = response.data.id;
      // add all songs to playlist
      sleep(500);
      setCurrentAction("Adding Top Songs to Playlist...");

      addSongsToPlaylist(playlistId, topSongs).then((response) => {
        setCurrentAction("");
        sleep(500);
        setPlaylistLoading(false);

        getPlaylist(playlistId).then((response) => {
          let playlistData = response.data;
          setPlaylist({
            name: playlistData.name,
            href: playlistData.external_urls.spotify,
            image: playlistData.images[0].url,
          });
          console.log(playlist);
        });
      });
    });
  };
  return (
    <>
      {modalOpen ? (
        <Modal>
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
                    <PlaylistImage src={playlist.image}></PlaylistImage>
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
                  <LoadingImage
                    src={LoadingGIF}
                    alt="Loading GIF"
                  ></LoadingImage>
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
        </Modal>
      ) : (
        ""
      )}
      <Wrapper>
        <TopSongsContainer>
          <SectionHeading>Your Top Tracks</SectionHeading>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "auto 50px",
            }}
          >
            <ButtonContainer>
              <AnimatedButton
                isActive={term === "short_term"}
                onClick={() => {
                  setTerm("short_term");
                }}
              >
                Last Month
              </AnimatedButton>
              <AnimatedButton
                isActive={term === "medium_term"}
                onClick={() => {
                  setTerm("medium_term");
                }}
              >
                Last 6 Months
              </AnimatedButton>
              <AnimatedButton
                isActive={term === "long_term"}
                onClick={() => {
                  setTerm("long_term");
                }}
              >
                All Time
              </AnimatedButton>
            </ButtonContainer>
            <ButtonContainer>
              <CreatePlaylistButton
                onClick={() => {
                  handleCreatingPlaylist();
                }}
              >
                Create Playlist Using Top Tracks
              </CreatePlaylistButton>
            </ButtonContainer>
          </div>
          <ProgressBar averagePopularity={averagePopularity} />
          <TopSongsList topSongs={topSongs} />
        </TopSongsContainer>
      </Wrapper>
    </>
  );
}

export default TopSongs;
