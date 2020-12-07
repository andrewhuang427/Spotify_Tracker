import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { getUser } from "../../api/index";

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content-center
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const ProfileImageContainer = styled.div`
  svg {
    font-size: 150px;
  }
`;

const ProfileHeading = styled.h4`
  margin: 10px auto;
`;

function User() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user.data);
    };
    fetchUser();
  }, []);

  return (
    <UserContainer>
      <div>
        <ProfileImageContainer>
          {user.images === undefined || user.images.length === 0 ? (
            <FaUserCircle />
          ) : (
            "Image Available..."
          )}
        </ProfileImageContainer>
        <ProfileHeading>User: {user.display_name}</ProfileHeading>
        <ProfileHeading>Country: {user.country}</ProfileHeading>
        <ProfileHeading>Account Type: {user.product}</ProfileHeading>
        <ProfileHeading>
          Followers:{" "}
          {user.followers !== undefined ? user.followers.total : "None"}
        </ProfileHeading>
      </div>
    </UserContainer>
  );
}

export default User;
