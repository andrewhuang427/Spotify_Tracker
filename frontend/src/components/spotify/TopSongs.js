import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getTopSongs,
  createPlaylist,
  addSongsToPlaylist,
  getPlaylist,
} from "../../api/index";
import { sleep } from "../../utils/index";
import Modal from "../ui/Modal";
import ProgressBar from "../ui/ProgressBar";
import SubNav from "../ui/SubNav";
import TopSongsList from "./TopSongsList";
import { AnimatedButton } from "../styled-components/AnimatedButton";
import { SectionHeading } from "../styled-components/Headings";
import { ButtonContainer } from "../styled-components/Containers";

const Wrapper = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #e4e4e4;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const TopSongsContainer = styled.div``;

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
      sleep(400);
      setCurrentAction("Adding Top Songs to Playlist...");
      // add all songs to playlist
      addSongsToPlaylist(playlistId, topSongs).then((response) => {
        setCurrentAction("");
        sleep(400);
        setPlaylistLoading(false);
        // gets new playlist data
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
      <SubNav Function={handleCreatingPlaylist} />
      {modalOpen ? (
        <Modal
          setModalOpen={setModalOpen}
          setPlaylist={setPlaylist}
          playlistLoading={playlistLoading}
          playlist={playlist}
          currentAction={currentAction}
        />
      ) : (
        ""
      )}
      <Wrapper>
        <TopSongsContainer>
          <SectionHeading>Your Top Tracks</SectionHeading>
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
          <ProgressBar averagePopularity={averagePopularity} />
          <TopSongsList topSongs={topSongs} />
        </TopSongsContainer>
      </Wrapper>
    </>
  );
}

export default TopSongs;
