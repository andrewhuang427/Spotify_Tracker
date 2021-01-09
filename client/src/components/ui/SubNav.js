import React from "react";
import styled from "styled-components";

const FixedContainer = styled.div`
  background: #000000bb;
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  padding: 15px 30px;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  padding: 10px;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const CreatePlaylistContainer = styled.div`
  flex: 40%;
  text-align: center;
  @media screen and (max-width: 768px) {
    text-align: left;
  }
`;
const CreatePlaylist = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: transparent;
  border-radius: 5px;
  border: 1px solid #777777;
  color: #e4e4e4;
  outline: none;
  margin-top: 10px;
  font-size: 18px;

  &:hover {
    background: #e4e4e411;
  }

  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;
function Navbar({ Function }) {
  return (
    <FixedContainer>
      <Container>
        <div style={{ flex: "60%", textAlign: "left" }}>
          <h2 style={{ marginBottom: "5px" }}>
            Create a Playlist from your Top Tracks
          </h2>
          <div style={{ fontSize: "12px", color: "#777777" }}>
            Use the your top tracks filtered down by 'Last Month', 'Last 6
            months', and 'All Time' to create a compiled playlist of your
            favorite tracks
          </div>
        </div>
        <CreatePlaylistContainer>
          <CreatePlaylist
            style={{}}
            onClick={() => {
              Function();
            }}
          >
            Create Playlist
          </CreatePlaylist>
        </CreatePlaylistContainer>
      </Container>
    </FixedContainer>
  );
}

export default Navbar;
