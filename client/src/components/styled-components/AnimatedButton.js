import styled from "styled-components";

export const AnimatedButton = styled.button`
  background: transparent;
  border: none;
  margin: 10px auto 0;
  font-size: 16px;
  outline: none;
  position: relative;
  transition: 0.3s;
  padding: 10px;
  color: ${(props) => (props.isActive ? "#1db954" : "#e4e4e4")};
  border-bottom: ${(props) => (props.isActive ? "3px solid #1db954" : "")};

  &:hover {
    cursor: pointer;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -3px;
    left: 0;
    background-color: #1db954;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
`;
