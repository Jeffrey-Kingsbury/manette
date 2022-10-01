import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import bg from "../../images/pastel_bg.jpg";
import logo from "../../images/manette_logo.png";
import Input from "../inputs/Input";
import ColorButton from "../inputs/ColorButton";
import FadeIn from "react-fade-in";
import Loading from "../Loading";

const ResetPassword = () => {
    const resetToken = useParams("token");
    const [userToReset, setUserToReset] = useState(false);
    const [passValue, setPassValue] = useState(false);
    const [error, setError] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        //Send the token to be verified by the backend, and get the username to be reset.
        const validateReset = async () => {
            await fetch('/resetpassword/' + resetToken.token)
                .then(res => res.json())
                .then(res => {
                    if (res.status !== 200) {
                        setError(res.error);
                        return;
                    }

                    setUserToReset(res.username)
                });
        }
        validateReset();
    }, []);


    const handleReset = async () => {
        setError(false);
        const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        if (!regex.test(passValue)) {
            setError("Password must contain: one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.");
            return;
        }
        await fetch('/resetpassword/' + resetToken.token, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ token: resetToken.token, password: passValue })

        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    handleRedirect();
                    setError(false);
                    setRedirecting(true);
                    return;
                }
                
                setError(res.message);
            });
    };


    const handleRedirect = () => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

    return (
        <Wrapper>
            <Container>
                <LogoWrapper>
                    <Logo src={logo} alt="Manette Logo" draggable="false" />
                    <LogoText>Manette</LogoText>
                </LogoWrapper>


                {!userToReset && !error &&
                    <Loading />
                }

                <span>
                    <Title>
                        {userToReset && userToReset}
                    </Title>
                    <Subtitle>
                        Password reset
                    </Subtitle>
                </span>
                {error &&
                    <ErrorWrapper>
                        {/* Error messages to be displayed to the user. */}

                        <FadeIn transitionDuration={500}>
                            <ErrorText> {error} </ErrorText>
                        </FadeIn>

                    </ErrorWrapper>
                }

                {redirecting &&
                    <ErrorWrapper>
                        {/*Redirecting message*/}
                        <Loading />
                        <FadeIn transitionDuration={500}>
                            <ErrorText>Password successfully changed. Redirecting...</ErrorText>
                        </FadeIn>

                    </ErrorWrapper>
                }


                {userToReset && <>
                    <InputWrapper>
                        <Input
                            type="password"
                            icon="password"
                            label="Password"
                            placeholder="Enter new password"
                            setValue={setPassValue}
                            required={true}
                        />
                    </InputWrapper>
                    <ButtonWrapper>

                        <ColorButton
                            color="#A691DB"
                            text="Reset"
                            textColor="white"
                            type="button"
                            width="50%"
                            height="3.5rem"
                            func={handleReset}
                        />
                    </ButtonWrapper>
                </>}

                {!userToReset && <ButtonWrapper>

                    <ColorButton
                        color="#A691DB"
                        text="Return to login"
                        textColor="white"
                        type="button"
                        width="50%"
                        height="3.5rem"
                        func={() => { navigate('/') }}
                    />
                </ButtonWrapper>}
            </Container>
        </Wrapper>

    );
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 0 10px 2px black;
  width: 400px;
  background-color: white;
  padding-bottom: 2rem;
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
  background: -webkit-linear-gradient(
    60deg,
    #a5d6af,
    #a691db,
    #f591cd,
    #ffc894
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: underline;
`;

const Title = styled.h1`
    width: 100%;
    font-size: xx-large;
    text-align: center;
`;

const Subtitle = styled.h1`
    width: 100%;
    font-size: x-large;
    text-align: center;
    margin: 1rem 0;
`;

const ErrorWrapper = styled.span`
  width: 80%;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;

const InputWrapper = styled.div`
  height: 50%;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
width: 100%;
margin-top: 2rem;
display: flex;
justify-content: center;
`;

export default ResetPassword;