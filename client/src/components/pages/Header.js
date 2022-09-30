import styled from "styled-components";
import logo from "../../images/manette_logo.png";
import { AiFillSetting } from 'react-icons/ai';
import SearchBar from "../inputs/SearchBar";
import { useNavigate } from "react-router";

const Header = () => {
const navigate = useNavigate();
    return (
        <Wrapper>
            <Logo alt="Manette Logo" src={logo} draggable="false" onClick={()=>{navigate('/dashboard')}}/>
            <NavigationWrapper>
<NewIssueItem>New ticket</NewIssueItem>
            </NavigationWrapper>
            <SearchBar />
            <SettingsWrapper><AiFillSetting fill="#A691DB" size={50} /></SettingsWrapper>
        </Wrapper>
    )
};

const Wrapper = styled.div`
width: 100vw;
height: 6rem;
box-shadow: 3px 0 15px 5px rgba(0,0,0,.3);
display: flex;
align-items: center;
justify-content: space-between;
`;



const SettingsWrapper = styled.span`
margin-right: 1rem;
cursor: pointer;
transition: all ease-in-out .4s;
display: flex;
justify-content: center;
align-items: center;

&:hover{
    transform: translateZ(0) rotate(120deg) scale(1.20);
}

&:active{
    transform: translateZ(0) rotate(240deg) scale(0.80);
}
`;
const NavigationWrapper = styled.ul`
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 1rem;
width: 100%;
height: 100%;
user-select: none;
`;
const NaigationItem = styled.li`

`;

const NewIssueItem = styled.li`
width: 150px;
height: 70%;
border-radius: 15px;
display: flex;
justify-content: center;
align-items: center;
background-color: #A5D6AF;
color: white;
font-size: x-large;
font-family: "Reem Kufi Ink", sans-serif;
cursor: pointer;
`;

const Logo = styled.img`
height: 75%;
user-select: none;
transition: all ease-in-out .2s;
margin-left: 1rem;
cursor: pointer;

&:hover{
    transform: translateZ(0) scale(1.05);
}

&:active{
    transform: translateZ(0) scale(0.95);
}
`;
export default Header;