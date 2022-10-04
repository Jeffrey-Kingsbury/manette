import Login from "./components/pages/Login";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import UserContext from './UserContext';
import ResetPassword from "./components/pages/ResetPassword";
import bg from "./images/pastel_bg.jpg";
import Header from "./components/pages/Header";
import NewBug from "./components/pages/NewBug";

function App() {

  return (
    <BrowserRouter>
      <UserContext>

        <Wrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<><Header /><Dashboard /></>} />
            <Route path="/new" element={<><Header /> <NewBug /></>} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
          </Routes>
        </Wrapper>

      </UserContext>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
max-width: 100vw;
height: 100vh;
overflow: hidden;
font-family: "Reem Kufi Ink", sans-serif;
background-image: url(${bg});
background-size: cover;
background-position: center;
`;

export default App;
