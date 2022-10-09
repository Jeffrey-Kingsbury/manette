import styled from "styled-components";

const Admin = () => {

    return (
<Wrapper>
    <Container>
            <SettingsNav>
                <NavItems href="#projects">Projects</NavItems>
                <NavItems href="#users">Users</NavItems>
            </SettingsNav>
            <InnerRightContainer>
                <InnerRightSection id="projects">project</InnerRightSection>
                <InnerRightSection id="users">users</InnerRightSection>
            </InnerRightContainer>
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

const InnerRightContainer = styled.div`
width: 100%;
height: 100%;
overflow-y: auto;
overflow-x: hidden;
`;

const InnerRightSection = styled.section`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
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

export default Admin;