import './App.css';
import React from 'react';
import GreetingModal from './components/GreetingModal';
import InputAddress from './components/common/InputAddress';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditMyPage from './pages/EditMyPage';
import SignUpPage from './pages/SignUpPage';
import StartPage from './pages/StartPage';
import CreateInvitationPage from './pages/CreateInvitationPage';
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
      <Route path="/edit1" element={< CreateInvitationPage />} />
      <Route path="/edit2" element={< CreateInvitationPage />} />
      <Route path="/edit3" element={< CreateInvitationPage />} />
      {/* TODO:Preview page */}
    </Routes>
  )
}
export default App;
