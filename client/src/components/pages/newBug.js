import styled from "styled-components";
import { userContext } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { AiOutlineFile } from "react-icons/ai";
import Loading from "../Loading";
import ColorButton from "../inputs/ColorButton";
import Input from "../inputs/Input";
import { useNavigate } from "react-router";
import uuid from 'react-uuid';

const NewBug = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedProject, setSelectedProject] = useState(false);
    const [department, setDepartment] = useState(false);
    const [assignee, setAssignee] = useState(false);
    const [platform, setPlatform] = useState(false);
    const [severity, setSeverity] = useState(false);
    const [component, setComponent] = useState(false);
    const [summary, setSummary] = useState(false);
    const [str, setStr] = useState(false);
    const [details, setDetails] = useState(false);
    const [notes, setNotes] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const { projectData, allUserData, currentUserData, validate } = useContext(userContext);
    const projectNames = Object.keys(projectData);
    const reporter = currentUserData.username;
    const newId = uuid();

    useEffect(() => {
        setSelectedProject(projectNames[0]);
        validate();
    }, [projectData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        const attachmentsInput = document.getElementById("attachments");
        const fd = new FormData();
        for (let x = 0; x < attachmentsInput.files.length; x++) {
            fd.append(newId, attachmentsInput.files[x]);
        };

        fd.append("status", "new");
        fd.append("reporter", reporter);
        fd.append("project", selectedProject);
        fd.append("department", department);
        fd.append("assignee", assignee);
        fd.append("platform", platform);
        fd.append("severity", severity);
        fd.append("component", component);
        fd.append("summary", summary);
        fd.append("str", str);
        fd.append("details", details);
        fd.append("notes", notes);
        fd.append("uid", newId);

        await fetch('/newbug/' + newId, {
            method: "POST",
            body: fd
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    setSuccess(true);
                    return;
                }
                setError(res.message);
            })
    }

    return (
        <Wrapper>
            <Container>
                {!error && success &&
                    <AfterSubMessage>
                        <Title>Success!</Title>
                        <AfterButtons>

                            <ButtonWrapper>
                                <ColorButton
                                    color="#A5D6AF"
                                    text="Submit another"
                                    textColor="white"
                                    type="submit"
                                    width="30%"
                                    height="3.5rem"
                                    func={() => navigate(0)}
                                />

                                <ColorButton
                                    color="#FFC894"
                                    text="Return to dashboard"
                                    textColor="white"
                                    type="submit"
                                    width="30%"
                                    height="3.5rem"
                                    func={() => navigate('/')}
                                />
                            </ButtonWrapper>
                        </AfterButtons>
                    </AfterSubMessage>
                }
                {
                    !success &&
                    <>
                        <Title>Create a ticket</Title>
                        <Form id="form" onSubmit={(e) => handleSubmit(e)}>
                            {error && !success &&
                                <AfterSubMessage>
                                    <Title style={{ backgroundColor: "#F591CD" }}>Error</Title>
                                    <ErrorMessage>ERROR</ErrorMessage>
                                </AfterSubMessage>
                            }
                            {!selectedProject && <Loading />}
                            {selectedProject && allUserData && (
                                <>
                                    <Row>
                                        <Col>
                                            <Label>Project</Label>
                                            <Select name="project" onChange={(e) => { setSelectedProject(e.target.value); }}>
                                                {projectNames.map((e, i) => {
                                                    return (
                                                        <Option value={e} key={e}>
                                                            {e}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>

                                        <Col>
                                            <Label>Department</Label>
                                            <Select name="department" defaultValue={null} onChange={(e) => { setDepartment(e.target.value); }} required>
                                                <Option value={null}></Option>
                                                {projectData[selectedProject]["departments"].map((e) => {
                                                    return (
                                                        <Option value={e} key={e}>
                                                            {e}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>

                                        <Col>
                                            <Label>Assignee</Label>
                                            <Select name="asignee" defaultValue={null} onChange={(e) => { setAssignee(e.target.value); }} required>
                                                <Option value={null}></Option>
                                                {allUserData.map((e) => {
                                                    return (
                                                        <Option value={e.username} key={e.username}>
                                                            {e.username} - {e.firstName} {e.lastName} ({e.role})
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Label>Platform</Label>
                                            <Select name="platform" defaultValue={null} onChange={(e) => { setPlatform(e.target.value); }} required>
                                                <Option value={null}></Option>
                                                {projectData[selectedProject]["platforms"].map((e) => {
                                                    return (
                                                        <Option value={e} key={e}>
                                                            {e}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>

                                        <Col>
                                            <Label>Severity</Label>
                                            <Select name="severity" defaultValue={null} onChange={(e) => { setSeverity(e.target.value); }} required>
                                                <Option value={null}></Option>
                                                {projectData[selectedProject]["severities"].map((e) => {
                                                    return (
                                                        <Option value={e} key={e}>
                                                            {e}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>

                                        <Col>
                                            <Label>Component</Label>
                                            <Select name="component" defaultValue={null} onChange={(e) => { setComponent(e.target.value); }} required>
                                                <Option value={null}></Option>
                                                {projectData[selectedProject]["components"].map((e) => {
                                                    return (
                                                        <Option value={e} key={e}>
                                                            {e}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Col>
                                    </Row>

                                    <Input
                                        name="summary"
                                        type="text"
                                        icon="summary"
                                        label="Summary"
                                        placeholder="[Platform][Build][Location] - [Summary]"
                                        width="600px"
                                        setValue={setSummary}
                                        required={true}
                                    />

                                    <Col>
                                        <Label>Steps to reproduce</Label>
                                        <TextArea name="str" height="100px" onChange={e => setStr(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Label>Details</Label>
                                        <TextArea name="details" height="300px" onChange={e => setDetails(e.target.value)} />
                                    </Col>

                                    <Col>
                                        <Label>Notes</Label>
                                        <TextArea name="notes" height="100px" onChange={e => setNotes(e.target.value)} />
                                    </Col>

                                    <Col>
                                        <Label>Attachments - Allowed types: [jpeg, mp4, .dmp, .txt, .pdf]</Label>
                                        <CustomFileUpload htmlFor="attachments">
                                            <MdOutlineDriveFolderUpload size={30} />Upload</CustomFileUpload>
                                        <FileUpload id="attachments" name="attachments" type="file" accept="image/jpeg, video/mp4, .dmp, .txt, .pdf" multiple onChange={(e) => { setAttachments(e.target.files) }} />

                                        <Label>Selected files:</Label>
                                        <FileNames>
                                            {
                                                Object.keys(attachments).map(e => {
                                                    return <Files key={e}><AiOutlineFile size={30} />{attachments[e].name}</Files>
                                                })
                                            }
                                        </FileNames>
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
                            )}
                        </Form>
                    </>
                }
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
  overflow: hidden;
  position: relative;
`;

const AfterSubMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const ErrorMessage = styled.div`
width: 100%;
height: 250px;
display: flex;
justify-content: center;
align-items: center;
`;
const AfterButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 95%;
  overflow-y: scroll;
`;

const Title = styled.h1`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  padding: 0.25rem 0;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
  background-color: #a691db;
  color: white;
  user-select: none;
  z-index: 9000;
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
  margin: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Select = styled.select`
  width: 200px;
  height: 2rem;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);
  margin-top: 0.25rem;
`;
const Option = styled.option`
font-size: larger;
`;

const Label = styled.label`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 600px;
  height: ${(props) => props.height};
  resize: none;
`;

const FileUpload = styled.input`
display: none;
`;

const CustomFileUpload = styled.label`
    border: 1px solid;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    display: flex;
    align-items: center; 
    justify-content: center;
    width: 150px;
    margin: 1rem;
`;

const FileNames = styled.ul`
width: 600px;
min-height: 10px;
border: 1px solid;
`;
const Files = styled.li`
margin: .5rem 2rem;
`;

export default NewBug;
