import Login from "./components/pages/Login";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import UserContext from './UserContext';

function App() {

  return (
    <BrowserRouter>
      <UserContext>

        <Wrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Wrapper>

      </UserContext>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
overflow: hidden;
`;
export default App;
