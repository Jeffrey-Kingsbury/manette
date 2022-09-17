import styled from 'styled-components';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import { useState } from 'react';

const Input = ({ icon, type, label, placeholder, setValue }) => {
    const [iconFill, setIconFill] = useState("gray")
    const getIcon = () => {
        switch (icon) {
            case "user":
                return <FaUserAlt fill={iconFill} size={30} />

            case "password":
                return <FaKey fill={iconFill} size={30} />

            default:
                return null;
        }
    };

    return (
        <>
            <Label>{label}</Label>
            <InputWrapper>
                {getIcon()}
                <In type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} onBlur={() => { setIconFill("gray") }} onFocus={() => { setIconFill("#A691DB") }} />
            </InputWrapper>
        </>
    );
};

const Label = styled.label`
width: 270px;
margin: 2rem 0 .5rem 0;
font-size: large;
user-select: none;
`;

const InputWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 2.5rem;
width: 250px;
border-bottom: 1px solid gray;
padding: 0 .5rem;

&:focus-within{
    border-bottom: 2px solid gray;
}
`;

const In = styled.input`
height: 100%;
width: 100%;
border-radius: 10px;
font-size: larger;
border: 0;
background-color: transparent;
margin-left: 1rem;

&:focus{
    outline: none;
    color: purple;

    &::placeholder{
        color:#A691DB;
    }
}
`;

export default Input;