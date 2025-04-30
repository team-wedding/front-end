import LogoutModal from '@/components/EditMyPage/LogoutModal';
import WithdrawModal from '@/components/EditMyPage/WithdrawModal';
import BackIcon from '@/components/icons/BackIcon';
import ChevronRight from '@/components/icons/Chevron_RightIcon';
import PageLayout from '@/components/layout/PageLayout';
import { logout, withdraw } from '@/services/userService';
import { useUserStore } from '@/store/useUserStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const EditProfilePage = () => {
  const { name, email, provider } = useUserStore();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogoutModalOpen(false);
      navigate('/login');
    } catch (error) {
      console.log('로그아웃 실패', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw();
      setIsLogoutModalOpen(false);
      navigate('/login');
    } catch (error) {
      console.log('회원탈퇴 실패', error);
    }
  };

  return (
    <PageLayout
      title="내 정보 관리"
      leftButton={
        <button onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
      }
      customFooter={null}
    >
      <div className="flex flex-col w-full h-content p-8">
        <div className="flex flex-col border-b border-border dark:border-border-dark mb-8">
          <h3 className="text-label-secondary/60 dark:text-label-secondary-dark/60 text-sm font-semibold mb-4">
            이름
          </h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-base text-label dark:text-label-dark">{name}</p>
            {provider === 'local' && (
              <button
                // onClick={() => navigate('/edit-name')}
                className="text-icon-muted/60 dark:text-icon-muted-dark/60 hover:text-icon dark:hover:text-icon-dark text-sm"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col border-b border-border dark:border-border-dark mb-8">
          <h3 className="text-label-secondary/60 dark:text-label-secondary-dark/60 text-sm font-semibold mb-4">
            이메일
          </h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-base text-label dark:text-label-dark">{email}</p>
            {provider === 'local' && (
              <button
                // onClick={() => navigate('/edit-name')}
                className="text-icon-muted/60 dark:text-icon-muted-dark/60 hover:text-icon dark:hover:text-icon-dark text-sm"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </div>

        {provider === 'local' && (
          <div className="flex flex-col border-b border-border dark:border-border-dark mb-8">
            <h3 className="text-label-secondary/60 dark:text-label-secondary-dark/60 text-sm font-semibold mb-4">
              비밀번호
            </h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-base text-label dark:text-label-dark">
                새로운 비밀번호로 변경 가능
              </p>
              <button
                onClick={() => navigate('/mypage/edit/password')}
                className="text-icon-muted/60 dark:text-icon-muted-dark/60 hover:text-icon dark:hover:text-icon-dark text-sm"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* <div className="flex flex-col mb-8">
                    <h3 className="text-gray-600 text-sm font-semibold mb-4">SNS 연동</h3>
                    <h3 className="text-black opacity-65 text-sm mb-4">연동된 계정으로 로그인할 수 있어요.</h3>
                    <div className="flex justify-between items-center">

                    </div>
                </div> */}

        <div className="flex justify-center items-center mt-8">
          <button
            className="flex-1 text-label dark:text-label-dark text-sm"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            로그아웃
          </button>
          <button
            className="flex-1 text-status-error dark:text-status-error-dark text-sm"
            onClick={() => setIsWithdrawModalOpen(true)}
          >
            회원탈퇴
          </button>
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onConfirm={handleWithdraw}
        onCancel={() => setIsWithdrawModalOpen(false)}
      />
    </PageLayout>
  );
};

export default EditProfilePage;
