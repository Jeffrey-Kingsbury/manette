import styled from 'styled-components';
import { FaUserAlt, FaKey } from 'react-icons/fa';

const Input = ({ icon, type, label, placeholder, setValue }) => {

    const getIcon = () => {
        switch (icon) {
            case "user":
                return <FaUserAlt fill='gray' size={30} />

            case "password":
                return <FaKey fill='gray' size={30} />

            default:
                return null;
        }
    };

    return (
        <>
            <Label>{label}</Label>
            <InputWrapper>
                {getIcon()}
                <In type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
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

    &::placeholder{
        color:lightgray
    }
}
`;

export default Input;