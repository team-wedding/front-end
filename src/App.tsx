import './App.css';
import React from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SplashPage from './pages/SplashPage';
import { Route, Routes } from 'react-router';
import CreateInvitationPage from './pages/CreateInvitationPage';
import PreviewInvitaionPage from './pages/PreviewInvitaionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/splash" element={<SplashPage />} />
      <Route path="/create" element={< CreateInvitationPage />} />
      <Route path="/preview" element={<PreviewInvitaionPage />} />
    </Routes>
  )
}

export default App;