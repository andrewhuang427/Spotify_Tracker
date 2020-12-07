import Logo from "../../images/Spotify_Logo.png";
import styled from "styled-components";
import React from "react";

const LoginBody = styled.div``;

const LoginContainer = styled.div`
  color: rgb(224, 224, 224);
  position: absolute;
  left: 50%;
  top: 30%;
  width: 400px;
  height: 100px;
  margin-top: -50px;
  margin-left: -200px;
  text-align: center;
`;

const LoginHeader = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 30px;

  img {
    width: 100%;
    object-fit: contain;
  }

  p {
    margin: 10px;
    font-size: small;
  }
`;

const LoginForm = styled.div`
  display: flex;
  justify-content: center;

  a {
    padding: 20px 50px;
    background-color: #1db954;
    cursor: pointer;
    color: black;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    outline: none;
  }
  a:hover {
    background-color: #1db95494;
  }
`;

function Login() {
  const loginURI = "http://localhost:8000/login";

  return (
    <LoginBody>
      <LoginContainer>
        <LoginHeader>
          <img src={Logo} alt="Spotify Logo"></img>
          <h1>Profile Tracker</h1>
          <p>
            Use this tool to visualize your top played songs, top artists, top
            playlists, and more.
          </p>
        </LoginHeader>
        <LoginForm>
          <a href={loginURI}>Log In to Spotify</a>
        </LoginForm>
      </LoginContainer>
    </LoginBody>
  );
}

export default Login;
