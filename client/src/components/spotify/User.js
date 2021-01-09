import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

const UserContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  svg {
    font-size: 150px;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  object-fit: contain;
  border-radius: 50%;
`;

const ProfileDetailsContainer = styled.div`
  padding: 10px;
`;

const ProfileHeading = styled.h4`
  color: #e4e4e4;
  display: inline-block;
  margin: 5px;
  padding: 5px;
  background: black;
  border-radius: 5px;
  font-size: 15px;
`;

function User({ user }) {
  return (
    <UserContainer>
      <div>
        <ProfileImageContainer>
          {user.images === undefined || user.images.length === 0 ? (
            <FaUserCircle />
          ) : (
            <ProfileImage src={user.images[0].url}></ProfileImage>
          )}
        </ProfileImageContainer>
        <ProfileDetailsContainer>
          <ProfileHeading>User: {user.display_name}</ProfileHeading>
          <ProfileHeading>Country: {user.country}</ProfileHeading>
          <ProfileHeading>Account Type: {user.product}</ProfileHeading>
          <ProfileHeading>
            Followers:{" "}
            {user.followers !== undefined ? user.followers.total : "None"}
          </ProfileHeading>
        </ProfileDetailsContainer>
      </div>
    </UserContainer>
  );
}

export default User;
