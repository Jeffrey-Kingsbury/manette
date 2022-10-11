import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import ColorButton from "../../inputs/ColorButton";
import Input from "../../inputs/Input";

const Invite = () => {
    const [emailValue, setEmailValue] = useState(false);
    const [roleValue, setRoleValue] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleInvite = async (e) => {
        e.preventDefault();
        setError(false);
        await fetch("/sendinvite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                role: roleValue
            }),
        })
        .then(res => res.json())
        .then(res => {
            if(res.status === 200){
                navigate(0);
            }
            else{
                setError(res.message);
            }
        })
    };

    return (
        <Form onSubmit={(e) => { handleInvite(e) }}>
            {error && <Error>{error}</Error>}
            <Label style={{ textDecoration: "underline" }}>Invite a new user</Label>
            <Input
                type="email"
                icon="user"
                label="Email"
                placeholder="Enter email"
                setValue={setEmailValue}
                required={true}
                width={"50%"}
            />
            <Span>
                <Label>Role</Label>
                <Select required defaultValue={""} onChange={(e) => { setRoleValue(e.target.value) }}>
                    <option value=""></option>
                    <option value="admin">Administrator</option>
                    <option value="it">IT / Helpdesk technician</option>
                    <option value="dev">Developer</option>
                    <option value="analyst">Analyst</option>
                </Select>
            </Span>

            <ColorButton
                color="#A691DB"
                text="Send invite"
                textColor="white"
                type="submit"
                width="50%"
                height="3.5rem"
            />
        </Form>
    );
}



const Form = styled.form`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Span = styled.span`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
`;

const Label = styled.label`
width: 50%;
margin: 1rem;
font-size: larger;
`;

const Select = styled.select`
width: 50%;
height: 2rem;
border-radius: 15px;
margin-bottom: 2rem;
`;

const Error = styled.h1`
width: 100%;
text-align: center;
font-size: large;
color:red;
`;

export default Invite;