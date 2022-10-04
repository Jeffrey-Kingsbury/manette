import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const YourBugsGraph = () =>{
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['Open bugs', 'Closed bugs', 'Feedback required', 'Waived bugs'],
        datasets: [
            {
                label: 'Bugs',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    '#A691DB',
                    '#A5D6AF',
                    '#F591CD',
                    '#FFC894'
                ]
            },
        ],
    };
    return(<Wrapper>                                
    <Pie data={data} 
        width={'50%'}
        height={'50%'}
        options={{ maintainAspectRatio: false }} /></Wrapper>)
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