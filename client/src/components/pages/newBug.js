import styled from "styled-components";
import Header from "./Header";

const NewBug = () => {
    return (
        <Wrapper>
            <Container>

            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
width: 100%;
height: calc(100vh - 4rem); //Factoring in the size of the header.
display: flex;
justify-content: center;
`;

const Container = styled.div``;

export default NewBug;