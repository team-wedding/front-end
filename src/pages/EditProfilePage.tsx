import LogoutModal from "@/components/EditMyPage/LogoutModal";
import WithdrawModal from "@/components/EditMyPage/WithdrawModal";
import BackIcon from "@/components/icons/BackIcon";
import ChevronRight from "@/components/icons/Chevron_RightIcon";
import PageLayout from "@/components/layout/PageLayout";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router";

const EditProfilePage = () => {
    const { name, email, provider } = useUserStore();
    const navigate = useNavigate();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const handleLogout = () => {
        // 실제 로그아웃 처리 로직 (예: API 호출)
        console.log('로그아웃');
        setIsLogoutModalOpen(false);
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    const handleWithdraw = () => {
        // 실제 회원탈퇴 처리 로직
        console.log('회원탈퇴');
        setIsWithdrawModalOpen(false);
        navigate('/login');
    }

    return (
        <PageLayout title='내 정보 관리' leftButton={<button onClick={() => navigate('/mypage')}><BackIcon /></button>} customFooter={null}>
            <div className='flex flex-col w-full h-content p-8'>

                <div className="flex flex-col border-b mb-8">
                    <h3 className="text-gray-600 text-sm font-semibold mb-4">이름</h3>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-base text-black">{name}</p>
                        {provider === "local" && (
                            <button
                                // onClick={() => navigate('/edit-name')}
                                className="text-gray-400 text-sm"
                            >
                                <ChevronRight />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col border-b mb-8">
                    <h3 className="text-gray-600 text-sm font-semibold mb-4">이메일</h3>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-base text-black">{email}</p>
                        {provider === "local" && (
                            <button
                                // onClick={() => navigate('/edit-name')}
                                className="text-gray-400 text-sm"
                            >
                                <ChevronRight />
                            </button>
                        )}
                    </div>
                </div>

                {provider === "local" && (
                    <div className="flex flex-col border-b mb-8">
                        <h3 className="text-gray-600 text-sm font-semibold mb-4">비밀번호</h3>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-base text-black">새로운 비밀번호로 변경 가능</p>
                            <button
                                onClick={() => navigate('/mypage/edit/password')}
                                className="text-gray-400 text-sm"
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
                        className="flex-1 text-black opacity-65 text-sm"
                        onClick={() => setIsLogoutModalOpen(true)}
                    >
                        로그아웃
                    </button>
                    <button
                        className="flex-1 text-black opacity-65 text-sm"
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