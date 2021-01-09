import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  height: 25px;
  width: 100%;
  background: linear-gradient(0.25turn, red, yellow, green);
  border-radius: 50px;
  margin: 15px 0;
`;

function ProgressBar({ averagePopularity }) {
  const fillerStyles = {
    height: "100%",
    width: `${averagePopularity}%`,
    background: "#00000080",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
  };

  return (
    <ProgressBarContainer>
      <div style={fillerStyles}>
        <span>Popularity Rating: </span>
        <span style={labelStyles}>{`${averagePopularity}%`}</span>
      </div>
    </ProgressBarContainer>
  );
}

export default ProgressBar;
