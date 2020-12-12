import React from "react";
import SubNav from "../ui/SubNav";
import TopSongs from "../spotify/TopSongs";
import Footer from "../ui/Footer";
import styled from "styled-components";

const Main = styled.main`
  margin-top: 225px;

  @media screen and (max-width: 900px) {
    margin-top: 250px;
  }

  @media screen and (max-width: 900px) {
    margin-top: 250px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 300px;
  }
  @media screen and (max-width: 500px) {
    margin-top: 350px;
  }
`;
function Artists() {
  return (
    <>
      <SubNav />
      <Main>
        <TopSongs />
        <Footer />
      </Main>
    </>
  );
}

export default Artists;
