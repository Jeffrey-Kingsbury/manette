import styled from "styled-components";
import { useContext } from "react";
import { userContext } from "../../UserContext";


const SettingsDropdown = ({ setSettingsActive }) => {
    const { handleLogout } = useContext(userContext);

    return (
        <Wrapper>
            <List>
                <Option
                    onClick={() => {
                        setSettingsActive(false);
                        handleLogout();
                    }}
                >
                    Log out
                </Option>

            </List>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 250px;
  height: 200px;
  background-color: white;
  position: absolute;
  bottom: -212px;
  left: -200px;
  z-index: 9999;
  border: 2px solid;
  border-top: 3px solid white;
  box-shadow: 0 6px 2px 0 rgba(0, 0, 0, 0.3);
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Option = styled.li`
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    font-size: larger;
    box-shadow: 0 6px 2px 0 rgba(0, 0, 0, 0.3);
  }

  &:active {
    font-size: small;
    transform: scale(0.97);
  }
`;

export default SettingsDropdown;
