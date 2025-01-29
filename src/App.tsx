import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { Route, Routes } from 'react-router';
import CreateInvitationPage from './pages/CreateInvitationPage';
import PreviewInvitaionPage from './pages/PreviewInvitaionPage';
import ResultPage from './pages/ResultPage';
import DashBoardPage from './pages/DashBoardPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EditInvitationPage from './pages/EditInvitationPage';
import NotFound404 from './pages/NotFound404';
import EmailLoginPage from './pages/EmailLoginPage';
import NaverRedirect from './components/login/SocialLogin/NaverRedirect';
import KakaoRedirect from './components/login/SocialLogin/KakaoRedirect';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EditMyPage from './pages/EditMyPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/dashboard'} element={<DashBoardPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path="/email-login" element={<EmailLoginPage />} />
          <Route path={'/signup'} element={<SignUpPage />} />
          <Route path={"/reset-password"} element={<ResetPasswordPage />} />
          <Route path={"/mypage"} element={<EditMyPage />} />
          {/* <Route path={"/change-password"} element={<ChangePasswordPage />} />   */}
          <Route path={'/create'} element={<CreateInvitationPage />} />
          <Route path={'/edit/:id'} element={<EditInvitationPage />} />
          <Route path={'/preview'} element={<PreviewInvitaionPage />} />
          <Route path={'/result/:id'} element={<ResultPage />} />
          <Route path="/oauth/callback/kakao" element={<KakaoRedirect />} />
          <Route path="/oauth/callback/naver" element={<NaverRedirect />} />
          <Route path={'*'} element={<NotFound404 />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
