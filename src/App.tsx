import './App.css';
import { Route, Routes } from 'react-router';
import CreateInvitationPage from './pages/CreateInvitationPage';
import DashBoardPage from './pages/DashBoardPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound404 from './pages/NotFound404';
import NaverRedirect from './components/login/SocialLogin/NaverRedirect';
import KakaoRedirect from './components/login/SocialLogin/KakaoRedirect';
import MyPage from './pages/MyPage';
import EditProfilePage from './pages/EditProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import SignUpPage from '@/pages/SignUpPage';
import StartPage from '@/pages/StartPage';
import LoginPage from '@/pages/LoginPage';
import ScrollToTop from '@/components/common/ScrollToTop';
import DarkModeProvider from './components/providers/DarkModeProvider';
import PreviewPhotoTalkPage from '@/pages/PhotoTalk/PreviewPhotoTalkPage';
import PreviewInvitationPage from '@/pages/PreviewInvitationPage';
import EditInvitationPage from '@/pages/EditInvitationPage';
import ResultPage from '@/pages/ResultPage';
import GuestPhotoTalkPage from '@/pages/PhotoTalk/GuestPhotoTalkPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
          <Route path={'/'} element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path={'/reset-password'} element={<ResetPasswordPage />} />
          <Route path={'/signup'} element={<SignUpPage />} />

          {/* 청첩장 만들기 */}
          <Route path={'/dashboard'} element={<DashBoardPage />} />
          <Route path={'/create/:id'} element={<CreateInvitationPage />} />
          <Route path={'/edit/:id'} element={<CreateInvitationPage />} />
          <Route
            path={'/preview/:userId?/:invitationId?'}
            element={<PreviewInvitationPage />}
          />
          <Route
            path={'/preview/phototalk'}
            element={<PreviewPhotoTalkPage />}
          />

          {/* 청첩장 완성본 */}
          <Route
            path={'/result/:userId/:invitationId'}
            element={<ResultPage />}
          />
          <Route
            path={'/phototalk/:userId/:invitationId'}
            element={<GuestPhotoTalkPage />}
          />

          {/* 마이페이지 */}
          <Route path={'/mypage/rsvp'} element={<MyPage />} />
          <Route path={'/mypage/phototalk'} element={<MyPage />} />
          <Route path={'/mypage/edit'} element={<EditProfilePage />} />
          <Route
            path={'/mypage/edit/password'}
            element={<ChangePasswordPage />}
          />
          <Route path="/oauth/callback/kakao" element={<KakaoRedirect />} />
          <Route path="/oauth/callback/naver" element={<NaverRedirect />} />
          <Route path={'*'} element={<NotFound404 />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
