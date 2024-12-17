import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import StartPage from './pages/StartPage';
import CreateInvitationPage1 from './pages/CreateInvitationPage1';
import CreateInvitationPage2 from './pages/CreateInvitationPage2';
import CreateInvitationPage3 from './pages/CreateInvitationPage3';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      {/* 홈페이지 */}
      <Route path="/" element={<HomePage />} />
      {/* 로그인/회원가입 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      {/* 랜딩페이지? */}
      <Route path="/start" element={<StartPage />} />
      {/* 만들기 페이지 */}
      <Route path="/edit1" element={< CreateInvitationPage1 />} />
      <Route path="/edit2" element={< CreateInvitationPage2 />} />
      <Route path="/edit3" element={< CreateInvitationPage3 />} />
      {/* TODO:Preview page */}
    </Routes>
  )
}
export default App;
