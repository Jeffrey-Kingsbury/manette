import styled from 'styled-components';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import { GrNotes } from 'react-icons/gr';
import { useState } from 'react';

const Input = ({ icon, type, label, placeholder, setValue, required = false, tab = 0, width = "250px" }) => {

    const [iconFill, setIconFill] = useState("gray")
    const getIcon = () => {
        switch (icon) {
            case "user":
                return <FaUserAlt fill={iconFill} size={20} />

            case "password":
                return <FaKey fill={iconFill} size={20} />

            case "summary":
                return <GrNotes fill={iconFill} size={20} />
                
            default:
                return null;
        }
    };

    return (
        <>
            <Label width={width}>{label}</Label>
            <InputWrapper width={width}>
                <IconWrapper>
                    {getIcon()}
                </IconWrapper>

                <In
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => { setValue(e.target.value) }}
                    onBlur={() => { setIconFill("gray") }}
                    onFocus={() => { setIconFill("#A691DB") }}
                    tabIndex={tab}
                />
            </InputWrapper>
        </>
    );
};

const Label = styled.label`
width: ${props => props.width};
margin: 2rem 0 .5rem 0;
font-size: large;
user-select: none;
`;

const InputWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 2.5rem;
width: ${props => props.width};
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

&:focus{
    outline: none;
    color: purple;

    &::placeholder{
        color:#A691DB;
    }
}
`;

const IconWrapper = styled.div`
margin-right: 1rem;
`;

export default Input;