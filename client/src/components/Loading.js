import ReactLoading from 'react-loading';
import styled from "styled-components";

const Loading = () => {

    return (
        <Wrapper>
            <ReactLoading type={"spokes"} color={"#A691DB"}  width={100} />
        </Wrapper>
    )

};

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;
export default Loading;