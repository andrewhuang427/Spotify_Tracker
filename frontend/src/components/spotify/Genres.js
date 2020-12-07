import React from "react";
import styled from "styled-components";

const GenreGridCell = styled.div`
  grid-column: 1/2;
  grid-row: 1/3;
  padding: 15px 5px 15px 30px;
  width: 100%;
  background: black;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  padding-right: 5px;
  height: 100%;
  overflow-y: scroll;
  text-align: left;
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
    background-color: rgb(255, 255, 255, 0.3);
  }
`;

const TopGenresList = styled.ul`
  list-style: none;
`;

const GenreListItem = styled.li`
  border-radius: 5px;
  background-color: #3c3c3c4d;
  margin: 5px auto;
  width: 100%;
  padding: 8px;
`;

function Genres({ Genres }) {
  return (
    <GenreGridCell>
      <Wrapper>
        <h2>Your Top Genres</h2>
        <TopGenresList>
          {Object.keys(Genres).map((genre, index) => {
            return (
              <GenreListItem key={index}>
                {index + 1 + ". " + genre}
              </GenreListItem>
            );
          })}
        </TopGenresList>
      </Wrapper>
    </GenreGridCell>
  );
}

export default Genres;
