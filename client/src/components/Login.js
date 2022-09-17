import styled from 'styled-components';
import bg from "../images/pastel_bg.jpg";
import logo from "../images/manette_logo.png";
import Input from './Input';
import { useState } from 'react';

const Login = () => {
    const [userValue, setUserValue] = useState(null);
    const [passValue, setPassValue] = useState(null);
    return (
        <Wrapper>
            <LoginWrapper>
                <LogoWrapper>
                    <Logo src={logo} alt="Manette Logo" draggable="false"/>
                    <LogoText>Manette</LogoText>
                </LogoWrapper>

                <LoginForm>
                <Input type="text" icon="user" label="Username" placeholder="Enter username" setValue={setUserValue}/>
                <Input type="password" icon="password" label="Password" placeholder="Enter password" setValue={setPassValue}/>
                <ForgotPass>Forgotten password?</ForgotPass>
                </LoginForm>
                
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
border-radius: 15px;
box-shadow: 0 0 10px 2px black;
width: 400px;
min-height:650px;
background-color: white;
font-family: 'Reem Kufi Ink', sans-serif;
`;

const LogoWrapper = styled.div`
width: 100%;
height: 150px;
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
background: -webkit-linear-gradient(60deg, lightblue, purple, pink, orange);
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
margin-top: .25rem;
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
export default Login;