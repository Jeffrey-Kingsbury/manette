import { useEffect, useState } from "react";
import styled from "styled-components";

const Admin = () => {
    const [userData, setUserData] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            await fetch('/getusers')
                .then(res => res.json())
                .then(res => setUserData(res.data));
        }
        getUsers();
    }, []);

    return (
        <Wrapper>
            <Container>
                <SettingsNav>
                    {/* <NavItems href="#projects">Projects</NavItems> */}
                    <NavItems href="#users">Users</NavItems>
                </SettingsNav>
                <InnerContainer>
                    {/* <Title>Projects</Title>
                    <InnerSection id="projects">
                    </InnerSection> */}
                    <Title>Users</Title>
                    <InnerSection id="users">
                        <AllUsersWrapper>
                            {userData && userData.map(e => {
                                return <UserItem key={e.username}>
                                    <span>First name: <input value={e.firstName} /></span>
                                    <span>Last name: <input value={e.lastName} /></span>
                                    <span>Username: {e.username}</span>
                                    <span>Role:</span>
                                    <Select defaultValue={e.role} id={e.username + "-role"}>
                                        <option value="admin">Administrator</option>
                                        <option value="it">IT / Helpdesk technician</option>
                                        <option value="dev">Developer</option>
                                        <option value="analyst">Analyst</option>
                                    </Select>
                                </UserItem>
                            })}
                        </AllUsersWrapper>
                        <InviteUsersWrapper>

                        </InviteUsersWrapper>
                    </InnerSection>
                </InnerContainer>
            </Container>
        </Wrapper>

    );
};

const Wrapper = styled.div`
width: 100%;
height: calc(100% - 4rem);
display: flex;
justify-content: center;
align-items: center;
scroll-behavior: smooth;
`;

const Container = styled.div`
width: 95%;
height: 95%;
background-color: white;
border-radius: 15px;
box-shadow: 3px 0 15px 5px rgba(0, 0, 0, 0.3);
display: flex;
flex-direction: column;
overflow: hidden;
border: solid 1px;
`;

const SettingsNav = styled.div`
width: 100%;
height: 2rem;
display: flex;
justify-content: center;
align-items: center;
border-bottom: solid 1px;
`;

const InnerContainer = styled.div`
width: 100%;
height: 100%;
overflow-y: auto;
overflow-x: hidden;
`;

const InnerSection = styled.section`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: start;
border: 1px solid;
`;

const NavItems = styled.a`
width: 100px;
height: 70%;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
border: 1px solid;
margin: 0 1rem;
background-color: #A691DB;
border: solid 2px black;
color: white;
border-radius: 15px;
`;

const Title = styled.h1`
width: 100%;
height: 2rem;
display: flex;
justify-content: center;
align-items: center;
font-size: x-large;
padding: .25rem 0;
box-shadow: 0 0 5px 5px rgba(0,0,0,0.3);
background-color: #A691DB;
color:white;
user-select: none;
`;

const AllUsersWrapper = styled.div`
width: 30%;
min-width: 600px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: start;
background-color: aliceblue;
border-right: solid 2px;
`;

const UserItem = styled.span`
width: 100%;
min-height: 8rem;
border-bottom: solid 2px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
margin: 1rem 0;
`;

const InviteUsersWrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: green;
`;

const Select = styled.select`
width: 60%;
height: 2rem;
border-radius: 15px;
`;
export default Admin;