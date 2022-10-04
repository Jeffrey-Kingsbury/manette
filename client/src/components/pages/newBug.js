import styled from "styled-components";
import { userContext } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import ColorButton from "../inputs/ColorButton";

const NewBug = () => {
    const [selectedProject, setSelectedProject] = useState(false);
    const { projectData, allUserData, currentUserData, validate } = useContext(userContext);
    console.log(allUserData)
    console.log(currentUserData)

    const projectNames = Object.keys(projectData);
    console.log(projectNames)

    useEffect(()=>{
        setSelectedProject(projectNames[0]);
        validate()
    }, [projectData]);

    return (
        <Wrapper>
            <Container>
                <Title>Create a ticket</Title>
                <Form>
                    <Col>
                        <Label>Project</Label>
                        <Select onChange={(e)=>{setSelectedProject(e.target.value)}}>
                            {projectNames.map((e, i) => {
                                return <Option value={e} key={e}>{e}</Option>
                            })}
                        </Select>
                    </Col>
                    {!selectedProject && <Loading />}
                    {selectedProject && allUserData && <>
                        <Col>
                            <Label>Severity</Label>
                            <Select defaultValue={null} required>
                                <Option value={null}></Option>
                                {projectData[selectedProject]['severities'].map(e => {
                                    return <Option value={e} key={e}>{e}</Option>
                                })}
                            </Select>
                        </Col>

                        <Col>
                            <Label>Department</Label>
                            <Select defaultValue={null} required>
                                <Option value={null}></Option>
                                {projectData[selectedProject]['departments'].map(e => {
                                    return <Option value={e} key={e}>{e}</Option>
                                })}
                            </Select>
                        </Col>

                        <Col>
                            <Label>Component</Label>
                            <Select defaultValue={null} required>
                                <Option value={null}></Option>
                                {projectData[selectedProject]['components'].map(e => {
                                    return <Option value={e} key={e}>{e}</Option>
                                })}
                            </Select>
                        </Col>

                        <Col>
                            <Label>Assignee</Label>
                            <Select defaultValue={null} required>
                                <Option value={null}></Option>
                                {allUserData.map(e => {
                                    return <Option value={e.username} key={e.username}>{e.username} - {e.firstName} {e.lastName} ({e.role})</Option>
                                })}
                            </Select>
                        </Col>
                        <ButtonWrapper>
                            <ColorButton
                                color="#A691DB"
                                text="Submit"
                                textColor="white"
                                type="submit"
                                width="50%"
                                height="3.5rem"
                            />
                        </ButtonWrapper>
                    </>
                    }


                </Form>
            </Container>

        </Wrapper>
    );
};

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

const Container = styled.div`
height: 80vh;
width: 50vw;
min-width: 800px;
background-color: white;
border-radius: 15px;
overflow: auto;
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

const ButtonWrapper = styled.span`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

const Col = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
`;

const Row = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`;

const Form = styled.form``;
const Select = styled.select``;
const Option = styled.option``;
const Label = styled.label``;

export default NewBug;