import styled from "styled-components";
import { userContext } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { AiOutlineFile } from "react-icons/ai";
import Loading from "../Loading";
import ColorButton from "../inputs/ColorButton";
import Input from "../inputs/Input";
import { useNavigate, useParams } from "react-router";

const Ticket = () => {

    const { projectData, allUserData, currentUserData, validate } = useContext(userContext);
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
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
    const [newAttachments, setNewAttachments] = useState([]);
    const projectNames = Object.keys(projectData);
    const [reporter, setReporter] = useState(false);
    const [project, setProject] = useState(false);
    const [uid, setUid] = useState(false);
    const [editing, setEditing] = useState(false);
    const [status, setStatus] = useState(false);

    const deleteAttachment = async (img) => {
        const confirm = window.confirm(`are you sure you want to delete ${img}? \nTHIS ACTION CANNOT BE UNDONE`);
        if (confirm) {
            await fetch(`/deleteAttachment/${uid}/${img}`, { method: "delete" })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 500) {
                        alert("An error occurred. Please refresh the page and try again");
                        return;
                    }
                    document.getElementById(img).remove();
                })
        }
    };

    useEffect(() => {
        validate();

        const getData = async () => {
            await fetch('/ticket/' + ticketId)
                .then(res => res.json())
                .then(res => {
                    const { assignee, component, department, details, notes, platform, project, reporter, severity, status, str, submittedDate, uid, summary } = res.data;
                    setSelectedProject(project);
                    setDepartment(department);
                    setAssignee(assignee);
                    setPlatform(platform.split(","));
                    setSeverity(severity);
                    setComponent(component);
                    setSummary(summary);
                    setStr(str);
                    setDetails(details);
                    setNotes(notes);
                    setReporter(reporter);
                    setProject(project);
                    setUid(uid)
                    setAttachments(res.attachments);
                    setStatus(status);
                })
        };
        getData();
    }, [projectData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        const attachmentsInput = document.getElementById("newAttachments");
        const fd = new FormData();
        for (let x = 0; x < attachmentsInput.files.length; x++) {
            fd.append(uid, attachmentsInput.files[x]);
        };

        fd.append("status", status);
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
        fd.append("uid", uid);
        fd.append("ticketId", ticketId);
        await fetch('/updateticket/' + uid, {
            method: "POST",
            body: fd
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    navigate(0);
                    return;
                }
                setError(res.message);
            })
    }

    return (
        <Wrapper>
            <Container>

                    <>
                        <Title>{ticketId}</Title>
                        <Form id="form" onSubmit={(e) => handleSubmit(e)}>
                            {error &&
                                <AfterSubMessage>
                                    <Title style={{ backgroundColor: "#F591CD" }}>Error</Title>
                                    <ErrorMessage>ERROR</ErrorMessage>
                                </AfterSubMessage>
                            }
                            {!selectedProject && <Loading />}
                            {project && projectData && allUserData && (
                                <>
                                    <Row>
                                        <Col>
                                            Reporter: {reporter}
                                        </Col>
                                        <Col>
                                            <Label>Status</Label>
                                            <Select disabled={!editing} name="status" defaultValue={status} onChange={(e) => { setStatus(e.target.value); }}>
                                                <Option value={"new"}>New</Option>
                                                <Option value={"open"}>Open</Option>
                                                <Option value={"resolved"}>Resolved</Option>
                                                <Option value={"feedback"}>Feedback required</Option>
                                                <Option value={"waived"}>Waived</Option>
                                                <Option value={"closed"}>Closed</Option>
                                            </Select>
                                        </Col>
                                        <Col>
                                            Edit:
                                            <input type="checkbox" onChange={() => { setEditing(!editing) }} />

                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label>Project</Label>
                                            <Select disabled={!editing} name="project" defaultValue={project} onChange={(e) => { setSelectedProject(e.target.value); }}>
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
                                            <Select disabled={!editing} name="department" defaultValue={department} onChange={(e) => { setDepartment(e.target.value); }} required>
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
                                            <Select disabled={!editing} name="asignee" defaultValue={assignee} onChange={(e) => { setAssignee(e.target.value); }} required>
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
                                            <Select disabled={!editing} multiple name="platform" style={{ height: "150px" }} defaultValue={platform} onChange={(e) => {
                                                const options = e.target.options;
                                                const filtered = []
                                                Object.keys(options).forEach((i) => {
                                                    if (options[i].selected === true) {
                                                        filtered.push(options[i].value)
                                                    };
                                                })
                                                setPlatform(filtered);
                                            }} required>
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
                                            <Select disabled={!editing} name="severity" defaultValue={severity} onChange={(e) => { setSeverity(e.target.value); }} required>
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
                                            <Select disabled={!editing} name="component" defaultValue={component} onChange={(e) => { setComponent(e.target.value); }} required>
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
                                        value={summary}
                                        disabled={!editing}
                                    />

                                    <Col>
                                        <Label>Steps to reproduce</Label>
                                        <TextArea disabled={!editing} name="str" height="100px" value={str} onChange={e => setStr(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Label>Details</Label>
                                        <TextArea disabled={!editing} name="details" height="300px" value={details} onChange={e => setDetails(e.target.value)} />
                                    </Col>

                                    <Col>
                                        <Label>Notes</Label>
                                        <TextArea disabled={!editing} name="notes" height="100px" value={notes} onChange={e => setNotes(e.target.value)} />
                                    </Col>

                                    <Col>

                                        {editing &&
                                            <>
                                                <Label>Attachments - Allowed types: [jpeg, mp4, .dmp, .txt, .pdf]</Label>
                                                <CustomFileUpload htmlFor="newAttachments">
                                                    <MdOutlineDriveFolderUpload size={30} />Upload
                                                </CustomFileUpload>
                                                <FileUpload id="newAttachments" name="newAttachments" type="file" accept="image/jpeg, video/mp4, .dmp, .txt, .pdf" multiple onChange={(e) => { setNewAttachments(e.target.files) }} />
                                                <Label>New attachments:</Label>
                                                <FileNames>
                                                    {
                                                        Object.keys(newAttachments).map(e => {
                                                            return <Files key={e}><AiOutlineFile size={30} />{newAttachments[e].name}</Files>
                                                        })
                                                    }
                                                </FileNames>
                                            </>
                                        }

                                        <Label>Attachments:</Label>
                                        <FileNames>
                                            {
                                                attachments.map(e => {
                                                    if (e.slice(-3) === "jpg") {

                                                        return <AttachmentImage id={e} key={e} src={`/uploads/${uid}/${e}`} onClick={() => {
                                                            if (!editing) {
                                                                window.open(`http://localhost:8000/uploads/${uid}/${e}`, '_blank')
                                                            } else {
                                                                deleteAttachment(e);
                                                            }
                                                        }
                                                        } crossOrigin='anonymous' />
                                                    } else {
                                                        return <a key={e} id={e} target={!editing ? "_blank" : ""} download={!editing} href={!editing ? `http://localhost:8000/uploads/${uid}/${e}` : ""} onClick={() => {
                                                            if (!editing) {
                                                                window.open(`http://localhost:8000/uploads/${uid}/${e}`, '_blank')
                                                            } else {
                                                                deleteAttachment(e);
                                                            }
                                                        }}>{e}</a>
                                                    }
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
                                            disabled={!editing}
                                        />
                                    </ButtonWrapper>
                                </>
                            )}
                        </Form>
                    </>
            </Container>
        </Wrapper>
    );
};

const AttachmentImage = styled.img`
max-width: 200px;
`;

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
margin: 1rem 0;
`;
const Files = styled.li`
margin: .5rem 2rem;
`;

export default Ticket;
