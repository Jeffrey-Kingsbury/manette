import styled from 'styled-components';
import bg from "../images/pastel_bg.jpg";
import logo from "../images/manette_logo.png";
import Input from './Input';
import { useState } from 'react';
import ColorButton from './ColorButton';

const Login = () => {
    const [userValue, setUserValue] = useState(null);
    const [passValue, setPassValue] = useState(null);

    const handleLogin = async () => {
        await fetch('/login', {
            method: "POST", body: {
                username: userValue,
                password: passValue
            }
        })
            .then(res => { res.json() })
            .then(res => {

            })
    };


    return (
        <Wrapper>
            <LoginWrapper>
                <LogoWrapper>
                    <Logo src={logo} alt="Manette Logo" draggable="false" />
                    <LogoText>Manette</LogoText>
                </LogoWrapper>

                <LoginForm>
                    <Input type="text" icon="user" label="Username" placeholder="Enter username" setValue={setUserValue} />
                    <Input type="password" icon="password" label="Password" placeholder="Enter password" setValue={setPassValue} />
                    <ForgotPass>Forgotten password?</ForgotPass>
                </LoginForm>

                <ButtonWrapper>
                    <ColorButton color='#A691DB' text="Login" textColor="white" type="" width='40%' height='3.5rem' />
                    <ColorButton color='#F591CD' text="Sign up" textColor="white" type="" width='40%' height='3.5rem' />
                </ButtonWrapper>

            </LoginWrapper>
        </Wrapper>
    )
};

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
background-image: url(${bg});
background-size: cover;
overflow: hidden;
display: flex;
justify-content: center;
align-items: center;
`;

const LoginWrapper = styled.div`
display: flex;
flex-direction: column;
border-radius: 15px;
box-shadow: 0 0 10px 2px black;
width: 400px;
height:600px;
background-color: white;
font-family: 'Reem Kufi Ink', sans-serif;
`;

const LogoWrapper = styled.div`
width: 100%;
height: 250px;
display: flex;
align-items: center;
justify-content: center;
user-select: none;
`;

const Logo = styled.img`
height: 70px;
`;

const LogoText = styled.h1`
font-size: 4rem;
margin-left: 1rem;
background: -webkit-linear-gradient(60deg, #A5D6AF, #A691DB, #F591CD, #FFC894);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
text-decoration: underline;
`;

const LoginForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const ForgotPass = styled.p`
width: 270px;
margin-top: .5rem;
cursor: pointer;
font-size: medium;
font-style: italic;
transition: all .2s;
text-rendering: optimizeLegibility;
user-select: none;

&:hover{
    transform: translateZ(0) scale(1.04);
}
&:active{
    transform: translateZ(0) scale(.97);
}
`;

const ButtonWrapper = styled.div`
height: 50%;
justify-content: center;
display: flex;
align-items: center;
`;
export default Login;