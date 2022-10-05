import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../../Loading";
import NotificationBars from ".././DashboardComponents/NotificationBars";

const ActivityFeed = () => {
    const [activityFeed, setActivityFeed] = useState(false);

    const getActivityFeed = async () => {
        await fetch('/activityFeed')
            .then(res => res.json())
            .then(res => {
                if (res.activityFeed.length > 0) {
                    setActivityFeed(res.activityFeed);
                    return;
                }
                setActivityFeed("EMPTY");
            });
    }
    
    useEffect(() => {

        getActivityFeed();


    }, []);

    return (<>
    <Wrapper>
        <Title>Activity feed</Title>
        <Container>

        {!activityFeed && <Loading />}
        {activityFeed === "EMPTY" && <Empty>Nothing to see here...</Empty>}
        {
            activityFeed !== "EMPTY" &&
            activityFeed &&
            activityFeed.map((e) => {
                return <NotificationBars key={e._id} notif={e} />
            })
        }
        </Container>
    </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
width: 90%;
margin: 0 auto;
height: 40%;
background-color: white;
border-radius: 15px;
box-shadow: 1px 5px 15px 5px rgba(0,0,0,0.3);
display: flex;
flex-direction: column;
align-items: center;
overflow: hidden;
`;

const Container = styled.div`
width: 100%;
height: 100%;
overflow: auto;
display: flex;
margin: 0 auto;
flex-direction: column-reverse;
align-items: center;
padding-top: .5rem;
`;

const Empty = styled.h2`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
font-size: larger;
user-select: none;
`;

const Title = styled.h1`
width: 100%;
height: 2rem;
display: flex;
justify-content: center;
align-items: center;
font-size: x-large;
padding: .25rem 0;
box-shadow: 0 0 5px 5px rgba(0,0,0,0.3);
background-color: #A691DB;
color:white;
z-index: 9;
user-select: none;
`;
export default ActivityFeed;