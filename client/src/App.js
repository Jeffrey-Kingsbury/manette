import Login from "./components/pages/Login";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import UserContext from './UserContext';
import ResetPassword from "./components/pages/ResetPassword";

function App() {

  return (
    <BrowserRouter>
      <UserContext>

        <Wrapper>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
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
