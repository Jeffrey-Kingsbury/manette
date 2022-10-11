import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import logo from "../../images/manette_logo.png";
import { AiFillSetting } from "react-icons/ai";
import { GiBugleCall } from "react-icons/gi";
import SettingsDropdown from '../inputs/SettingsDropdown';
import { userContext } from "../../UserContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsActive, setSettingsActive] = useState(false);
  const { currentUserData } = useContext(userContext);
  
  const sendShout = () => {
    const shout = prompt("What would you like to shout?");
    if (shout && shout.trim().length > 0) {
      fetch('/shout', {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(
          {
            message: shout,
            user: currentUserData.username,
            firstName: currentUserData.firstName,
            lastName: currentUserData.lastName,
            avatarSrc: currentUserData.avatarSrc,
            role:currentUserData.role
          }
        )
      })
      if(location.pathname === '/') navigate(0);
    }
  }

  return (
    <Wrapper>
    {currentUserData &&
      <>
      <Logo
        alt="Manette Logo"
        src={logo}
        draggable="false"
      />
      <NavigationWrapper>
        <NewIssueItem onClick={() => { navigate('/new') }}>New ticket</NewIssueItem>
        <NaigationItem onClick={() => { navigate('/') }}>Dashboard</NaigationItem>
        <NaigationItem onClick={() => { navigate('/alltickets') }}>All tickets</NaigationItem>
      </NavigationWrapper>

      { currentUserData.role === "admin" && <Shout onClick={() => { sendShout() }}><p>Shout</p><GiBugleCall size={45} fill="purple" /></Shout> }

      <SettingsWrapper>
        <UserDataWrapper>

          {currentUserData && currentUserData.avatarSrc &&
            <UserAvatar
              alt={currentUserData.firstName + "'s avatar image"}
              src={currentUserData.avatarSrc}
              draggable="false"
            />
          }

          {currentUserData.firstName && !currentUserData.avatarSrc &&
            <UserAvatarLetterBackup>
              {currentUserData.firstName.slice(0, 1)}
              {currentUserData.lastName.slice(0, 1)}
            </UserAvatarLetterBackup>
          }

          <UserNameText>
            Hello, {currentUserData && currentUserData.firstName}
          </UserNameText>
        </UserDataWrapper>

        <SettingsIconWrapper onClick={() => { setSettingsActive(!settingsActive) }}>
          <AiFillSetting fill="#A691DB" size={50} />
        </SettingsIconWrapper>

        {
          settingsActive &&
          <SettingsDropdown setSettingsActive={setSettingsActive} />
        }

      </SettingsWrapper>
      </>
    }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 4rem;
  box-shadow: 3px 0 15px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 2px solid;
  user-select: none;
`;

const SettingsWrapper = styled.span`
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SettingsIconWrapper = styled.span`
  transition: all ease-in-out 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: translateZ(0) rotate(120deg) scale(1.2);
  }

  &:active {
    transform: translateZ(0) rotate(240deg) scale(0.8);
  }
`;

const UserDataWrapper = styled.div`
height: 100%;
width: auto;
display: flex;
justify-content: center;
align-items: center;
margin: 0 1rem;
`;

const UserNameText = styled.span`
height: 75%;
width: auto;
border-right: 2px solid;
padding-right: 1rem;
`;

const UserAvatar = styled.img`
height: 3rem;
border-radius: 50%;
aspect-ratio: 1/1;
margin-right: 1rem;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
`;

const UserAvatarLetterBackup = styled.div`
width: 50px;
height: 50px;
aspect-ratio: 1/1;
border-radius: 100%;
background-color: #F591CD;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
color: white;
font-size: x-large;
margin: 0 1rem;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
`;

const NavigationWrapper = styled.ul`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const NaigationItem = styled.li`
margin: 1rem;
cursor: pointer;
transition: all ease-in-out 0.2s;

&:hover {
    transform: translateZ(0) scale(1.05);
  }

  &:active {
    transform: translateZ(0) scale(0.95);
  }
`;

const NewIssueItem = styled.li`
  width: 150px;
  height: 70%;
  margin: auto 1rem;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a5d6af;
  color: white;
  font-size: x-large;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: #99c7a2;
    transform: translateZ(0) scale(1.05);
  }

  &:active {
    transform: translateZ(0) scale(0.95);
  }
`;

const Logo = styled.img`
  height: 75%;
  user-select: none;
  transition: all ease-in-out 0.2s;
  margin-left: 1rem;
`;

const Shout = styled.span`
display: flex;
width: 180px;
justify-content: space-between;
padding: 0 1rem;
align-items: center;
font-size: x-large;
cursor: pointer;
height: 70%;
border: 2px solid;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
transition: all .2s ease-in-out;

&:hover{
  transform: scale(1.03);
}
`;
export default Header;
