import React from "react";
import styled from "styled-components";
import TopArtists from "../spotify/TopArtists";
import Footer from "../ui/Footer";

const Main = styled.main`
  margin-top: 80px;
`;
function Artists() {
  return (
    <Main>
      <TopArtists />
      <Footer />
    </Main>
  );
}

export default Artists;
