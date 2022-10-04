import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../../Loading";
import NotificationBars from ".././DashboardComponents/NotificationBars";

const ActivityFeed = () => {
    const [activityFeed, setActivityFeed] = useState(false);

    useEffect(() => {
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

        getActivityFeed();

    }, []);

    return (<Wrapper>
        <Title>Activity feed</Title>
        {!activityFeed && <Loading />}
        {activityFeed === "EMPTY" && <Empty>Nothing to see here...</Empty>}
        {
            activityFeed !== "EMPTY" &&
            activityFeed &&
            activityFeed.map((e) => {
                console.log(e)
                return <NotificationBars key={e._id} notif={e} />
            })
        }
    </Wrapper>);
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
overflow: auto;
`;

const Empty = styled.h2`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
font-size: larger;
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
margin-bottom: 1rem;
`;
export default ActivityFeed;