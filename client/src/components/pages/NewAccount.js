import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import bg from "../../images/pastel_bg.jpg";
import logo from "../../images/manette_logo.png";
import Input from "../inputs/Input";
import ColorButton from "../inputs/ColorButton";
import FadeIn from "react-fade-in";
import Loading from "../Loading";

const NewAccount = () => {
    const resetToken = useParams("token");
    const [userData, setUserData] = useState(false);

    const [firstName, setFirstName] = useState(false);
    const [lastName, setLastName] = useState(false);
    const [password, setPassword] = useState(false);
    const [username, setUsername] = useState(false);

    const [error, setError] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const validate = async () => {
            await fetch("/verifysignup/" + resetToken.token)
                .then(res => res.json())
                .then(res => {
                    if(res.status === 400){
                        setError(res.error);
                        setUserData(res.error);
                    return;
                    }
                    setUserData(res.data)
                    
                });
        }
        validate()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        if (!regex.test(password)) {
            setError("Password must contain: one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.");
            return;
        }
        const { email, role } = userData;

        await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: username,
                pass: password,
                firstName: firstName,
                lastName: lastName,
                email: userData.email,
                role: userData.role
            }),
        })
        .then(res => res.json())
        .then(res =>{
            if(res.status === 400){
                setError(res.message);
                return;
            }
            handleRedirect();
            setError(false);
            setRedirecting(true);
        })
    }

    const handleRedirect = () => {
        setTimeout(() => {
            navigate('/login');
        }, 3000)
    }

    return (
        <Wrapper>
            {!userData && <Loading />}
            {
                userData &&
                <Container>
                    <LogoWrapper>
                        <Logo src={logo} alt="Manette Logo" draggable="false" />
                        <LogoText>Manette</LogoText>
                    </LogoWrapper>


                    <span>
                        <Title>
                            Welcome!
                        </Title>
                        <Subtitle>
                            Let's get your account created.
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
                                <ErrorText>Account created. Redirecting...</ErrorText>
                            </FadeIn>
                        </ErrorWrapper>
                    }

                   {!error && <Form onSubmit={(e) => { handleSubmit(e) }}>
                        <Input
                            type="text"
                            icon="user"
                            label="Username"
                            placeholder="Enter a username"
                            required={true}
                            setValue={setUsername}
                        />

                        <Input
                            type="text"
                            icon="user"
                            label="First name"
                            placeholder="Enter your first name"
                            required={true}
                            setValue={setFirstName}

                        />
                        <Input
                            type="text"
                            icon="user"
                            label="Last name"
                            placeholder="Enter your last name"
                            required={true}
                            setValue={setLastName}

                        />
                        <Input
                            type="password"
                            icon="password"
                            label="Password"
                            placeholder="Enter a password"
                            required={true}
                            setValue={setPassword}

                        />
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
                    </Form>}
                </Container>}
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

const Form = styled.form`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
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

export default NewAccount;