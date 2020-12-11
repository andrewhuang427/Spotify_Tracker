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

const CreatePlaylist = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  background: transparent;
  border-radius: 5px;
  border: 3px solid #e4e4e4;
  color: #e4e4e4;
  outline: none;
  margin-top: 10px;
  font-size: 18px;

  &:hover {
    background: #1db954;
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
          <h2>Create a Playlist from your Top Tracks</h2>
          <div style={{ fontSize: "12px", color: "#777777" }}>
            Use the your top tracks filtered down by 'Last Month', 'Last 6
            months', and 'All Time' to create a compiled playlist of your
            favorite tracks
          </div>
        </div>
        <div style={{ flex: "40%", textAlign: "center" }}>
          <CreatePlaylist
            style={{}}
            onClick={() => {
              Function();
            }}
          >
            Create Playlist
          </CreatePlaylist>
        </div>
      </Container>
    </FixedContainer>
  );
}

export default Navbar;
