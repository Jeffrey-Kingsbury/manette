import styled from "styled-components";
import Input from "../../inputs/Input";
import ColorButton from "../../inputs/ColorButton";
import FadeIn from "react-fade-in";
import { useState } from "react";
import Loading from "../../Loading";

const ForgotPasswordModal = ({ setForgotModal }) => {
    const [userValue, setUserValue] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [currentlySubmitting, setCurrentlySubmitting] = useState(false);
    const [message, setMessage] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentlySubmitting(true);
        await fetch("/forgotPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userValue,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                setCurrentlySubmitting(false);
                setMessage(res.message);
            });
    };

    return (
        <Wrapper
            id="closeModal"
            onClick={(e) => {
                if (e.target.id === "closeModal") {
                    setForgotModal(false);
                }
            }}
        >
            <ModalWrapper>
                {!submitted && (
                    <>
                        <FadeIn>
                            <Title>Forgot your password?</Title>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <SubTitle>
                                No problem. Just enter the email associated with your account
                                and we'll send you a request to reset your password.
                            </SubTitle>
                        </FadeIn>

                        {currentlySubmitting && 
                        <Loading />
                        }

                        {message && (
                            <FadeIn delay={300}>
                                <SuccessMessage>{message}</SuccessMessage>
                            </FadeIn>
                        )}

                        <form onSubmit={(e) => handleSubmit(e)}>
                            <InputWrapper>
                                <Input
                                    type="email"
                                    icon="user"
                                    label="Email"
                                    placeholder="Enter Email"
                                    setValue={setUserValue}
                                    required={true}
                                />
                            </InputWrapper>

                            <ButtonWrapper>
                                <ColorButton
                                    color="#A691DB"
                                    text="Submit"
                                    textColor="white"
                                    type="submit"
                                    width="50%"
                                    height="3.5rem"
                                    disabled={currentlySubmitting}
                                />
                            </ButtonWrapper>
                        </form>
                    </>
                )}
            </ModalWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 200px;
  width: 70%;
  max-width: 700px;
  border-radius: 15px;
  box-shadow: 0 0 10px 2px black;
  background-color: white;
  font-family: "Reem Kufi Ink", sans-serif;
  cursor: default;
`;

const Title = styled.h1`
  text-align: center;
  font-size: xx-large;
  margin: 1rem 0;
  text-decoration: underline;
`;

const SubTitle = styled.h2`
  text-align: center;
  width: 70%;
  margin: 1rem auto;
`;

const SuccessMessage = styled.h3`
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  width: 70%;
  margin: 1rem auto 0 auto;
  color: #a5d6af;
  font-size: x-large;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

export default ForgotPasswordModal;
