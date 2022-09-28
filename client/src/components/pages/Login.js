import { useState } from 'react';
import styled from 'styled-components';
import bg from "../../images/pastel_bg.jpg";
import logo from "../../images/manette_logo.png";
import Input from '../inputs/Input';
import ColorButton from '../inputs/ColorButton';
import FadeIn from 'react-fade-in';
import ForgotPasswordModal from './modals/ForgotPasswordModal';

const Login = () => {
    const [userValue, setUserValue] = useState(null);
    const [passValue, setPassValue] = useState(null);
    const [error, setError] = useState(false);
    const [forgotModal, setForgotModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError(false);
        await fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": userValue,
                "password": passValue
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    return
                }
                setError(res.message);
            })

    };

    return (
        <Wrapper>
            {forgotModal &&
                <ForgotPasswordModal setForgotModal={setForgotModal} />
            }
            <LoginWrapper>
                <LogoWrapper>
                    <Logo src={logo} alt="Manette Logo" draggable="false" />
                    <LogoText>Manette</LogoText>
                </LogoWrapper>

                <ErrorWrapper>

                    {/* Any messages that would appear above the login go here. NOTE: Any errors will replace this message.*/}
                    {!error &&
                        <FadeIn transitionDuration={500}>
                            <ErrorText demo={true}>
                                For demo purposes:<br /><br />
                                Username: DEMO<br />
                                Password: Testpassword!
                            </ErrorText>
                        </FadeIn>
                    }

                    {/* Error messages to be displayed to the user. */}
                    {error &&
                        <FadeIn transitionDuration={500}>
                            <ErrorText> {error} </ErrorText>
                        </FadeIn>
                    }
                </ErrorWrapper>

                <LoginForm onSubmit={(e) => { handleLogin(e) }}>
                    <Input type="text" icon="user" label="Username" placeholder="Enter username" setValue={setUserValue} required={true} tab={forgotModal ? -1 : 0} />
                    <Input type="password" icon="password" label="Password" placeholder="Enter password" setValue={setPassValue} required={true} tab={forgotModal ? -1 : 0} />
                    {
                        //Conditional render here will stop the text bleeding through the modal from the hover effect
                        !forgotModal &&
                        <ForgotPass onClick={() => { setForgotModal(!forgotModal) }}>Forgotten password?</ForgotPass>
                    }
                    <ButtonWrapper>
                        <ColorButton color='#A691DB' text="Login" textColor="white" type="submit" width='50%' height='3.5rem' tab={forgotModal ? -1 : 0} />
                    </ButtonWrapper>
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
margin: 1.5rem 0;
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
width: 100%;
margin-top: 2rem;
justify-content: center;
display: flex;
align-items: center;
`;

const ErrorWrapper = styled.span`
width: 100%;
min-height: 3rem;
display: flex;
justify-content: center;
align-items: center;
margin: 1rem 0;
`;

const ErrorText = styled.p`
color: ${props => props.demo ? "black" : "red"};
text-align: center;
`;

export default Login;