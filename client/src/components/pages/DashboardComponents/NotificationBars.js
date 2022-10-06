import styled from "styled-components";
import { GiBugleCall, GiSpottedBug, GiLongAntennaeBug } from "react-icons/gi";
import { CgComment } from "react-icons/cg";
import { FaFileUpload } from "react-icons/fa";

const NotificationBars = ({ notif }) => {
    const { role, firstName, lastName, avatarSrc } = notif.updateUserProfile;
    const { ticketId, time, type, updateUser, submittedDate } = notif;

    const getNotification = () => {
        switch (type.toUpperCase()) {
            case "NEWBUG":
                return (
                    <Message>
                        Created a new ticket. <a href={`/ticket/${ticketId}`}>{ticketId}</a>
                    </Message>
                );

            case "UPDATEBUG":
                return (
                    <Message>
                        Updated ticket <a href={`/ticket/${ticketId}`}>{ticketId}</a>
                    </Message>
                );
            case "ADDCOMMENT":
                return (
                    <Message>
                        Added a comment to <a href={`/ticket/${ticketId}`}>{ticketId}</a>
                    </Message>
                );

            case "ADDATTACHMENT":
                return (
                    <Message>
                        Added attachments to <a href={`/ticket/${ticketId}`}>{ticketId}</a>
                    </Message>
                );

            case "SHOUT":
                return (
                    <Message>
                        {notif.shoutMessage}
                    </Message>
                );
        }
    };

    const getIcon = () => {
        switch (type) {
            case "NEWBUG":
                return <GiSpottedBug size={40} fill="black" />;

            case "UPDATEBUG":
                return <GiLongAntennaeBug size={40} fill="black" />;

            case "ADDCOMMENT":
                return <CgComment size={40} fill="black" />;

            case "ADDATTACHMENT":
                return <FaFileUpload size={40} fill="black" />;

            case "SHOUT":
                return <GiBugleCall size={40} fill="black" />;

            default:
                return null;
        }
    };
    return (
        <Wrapper type={type}>
            {!avatarSrc && (
                <Initials type={type}>
                    {firstName.slice(0, 1)}
                    {lastName.slice(0, 1)}
                </Initials>
            )}

            {avatarSrc && <Avatar src={avatarSrc} alt="Users avatar" />}

            <MessageWrapper>
                <Name>
                    {firstName} {lastName.slice(0, 1)}. ({role})
                </Name>
                {getNotification()}
                {submittedDate}
            </MessageWrapper>
            <IconWrapper>{getIcon()}</IconWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 98%;
  min-height: 4rem;
  margin: 0.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  background-color: ${(props) =>
        props.type === "SHOUT" ? "#FFC894" : "white"};
`;

const Avatar = styled.img`
  width: 75px;
`;

const Initials = styled.div`
  width: 75px;
  height: 100%;
  color: ${(props) => (props.type === "SHOUT" ? "black" : "white")};
  background-color: ${(props) =>
        props.type === "SHOUT" ? "#FFF5BD" : "#F591CD"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-align: center;
  user-select: none;
`;

const MessageWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: large;
  padding: 0 1rem;
`;

const Name = styled.h1`
  text-transform: capitalize;
  text-decoration: underline;
  font-size: larger;
  margin-bottom: .25rem;
`;

const Message = styled.p`
  margin: 0.25rem 0;
  a {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
    margin-left: .5rem;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default NotificationBars;
