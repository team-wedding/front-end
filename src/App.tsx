import './App.css';
import { Route, Routes } from 'react-router';
import CreateInvitationPage from './pages/CreateInvitationPage';
import PreviewInvitaionPage from './pages/PreviewInvitaionPage';
import ResultPage from './pages/ResultPage';
import DashBoardPage from './pages/DashBoardPage';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EditInvitationPage from './pages/EditInvitationPage';
import NotFound404 from './pages/NotFound404';
import NaverRedirect from './components/login/SocialLogin/NaverRedirect';
import KakaoRedirect from './components/login/SocialLogin/KakaoRedirect';
import MyPage from './pages/MyPage';
// import RsvpStatsPage from './pages/RsvpStatsPage';
import EditProfilePage from './pages/EditProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import SignUpPage from '@/pages/SignUpPage';
// import AdminPhotoTalkPage from '@/pages/PhotoTalk/AdminPhotoTalkPage';
import PhotoTalkPage from '@/pages/PhotoTalk/PhotoTalkPage';
import StartPage from '@/pages/StartPage';
import LoginPage from '@/pages/LoginPage';
import ScrollToTop from '@/components/common/ScrollToTop';
import DarkModeProvider from './components/providers/DarkModeProvider';
import { useUserStore } from './store/useUserStore';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  const queryClient = new QueryClient();
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const token = useAuthStore((state) => state.accessToken);

  // console.log('현재 token:', token);

  useEffect(() => {
    // console.log('✅ useEffect 실행됨, token:', token);
    if (token) {
      fetchUserInfo();
      console.log('사용자 정보 api 호출');
    }
  }, [token]);

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
          {/* 청첩장 */}
          <Route path={'/dashboard'} element={<DashBoardPage />} />
          <Route path={'/create'} element={<CreateInvitationPage />} />
          <Route path={'/edit/:id'} element={<EditInvitationPage />} />
          <Route
            path={'/preview/:userId/:invitationId'}
            element={<PreviewInvitaionPage />}
          />
          <Route path={'/preview'} element={<PreviewInvitaionPage />} />
          <Route
            path={'/result/:userId/:invitationId'}
            element={<ResultPage />}
          />
          <Route
            path={'/phototalk/:userId/:invitationId'}
            element={<PhotoTalkPage />}
          />
          {/* 마이페이지 */}
          {/* <Route path={'/mypage'} element={<MyPage />} /> */}
          <Route path={'/mypage/edit'} element={<EditProfilePage />} />
          <Route
            path={'/mypage/edit/password'}
            element={<ChangePasswordPage />}
          />
          <Route path={'/mypage/rsvp'} element={<MyPage />} />
          <Route path={'/mypage/phototalk'} element={<MyPage />} />
          <Route path="/oauth/callback/kakao" element={<KakaoRedirect />} />
          <Route path="/oauth/callback/naver" element={<NaverRedirect />} />
          <Route path={'*'} element={<NotFound404 />} />
        </Routes>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
