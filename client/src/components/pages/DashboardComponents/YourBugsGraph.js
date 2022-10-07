import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { userContext } from "../../../UserContext";
import { useContext, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const YourBugsGraph = () => {
    const { currentUserData } = useContext(userContext);
    const [data, setData] = useState(false);
    const tickets = {
        new: 0,
        open: 0,
        closed: 0,
        feedback: 0,
        waived: 0,
        resolved: 0
    };

    useEffect(() => {
        const getTickets = async () => {
            await fetch(`/getalltickets/user/${currentUserData.username}`)
                .then((res) => res.json())
                .then((res) => {
                    Object.keys(res.data).forEach(e => {
                        switch (res.data[e].status.toLowerCase()) {
                            case "new":
                                tickets.new += 1;
                                break;

                            case "open":
                                tickets.open += 1;
                                break;

                            case "resolved":
                                tickets.resolved += 1;
                                break;

                            case "waived":
                                tickets.waived += 1;
                                break;

                            case "feedback":
                                tickets.feedback += 1;
                                break;
                        }
                    });
                });
        }

        getTickets().then(e => setData({
            labels: ['New tickets', 'Open tickets', 'Closed tickets', 'Feedback required', 'Waived tickets', 'Resolved tickets'],
            datasets: [
                {
                    label: 'tickets',
                    data: [tickets.new, tickets.open, tickets.closed, tickets.feedback, tickets.waived, tickets.resolved],
                    backgroundColor: [
                        '#A691DB',
                        '#A5D6AF',
                        '#F591CD',
                        '#FFC894',
                        '#FFF5BD',
                        '#F1705F'
                    ]
                },
            ],
        }));
    }, []);

    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <Wrapper>
            {data &&
                <Pie
                    data={data}
                    width={'50%'}
                    height={'50%'}
                    options={{ maintainAspectRatio: false }}
                />
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 90%;
height: 70%;
margin: auto;
`;
export default YourBugsGraph;