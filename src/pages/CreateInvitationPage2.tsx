import React from 'react';

import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { useInvitationStore } from '../store/useInvitaionStore';
import HeaderButton from '../components/common/Header/HeaderButton';
import InvitationTitleInput from '../components/common/CreateInvitation/InvitationTitleInput';
import WeddingDateInput from '../components/form/WeddingDateInput/WeddingDateInput';
const CreateInvitationPage: React.FC = () => {
  const { title, setTitle } = useInvitationStore();
  const navigate = useNavigate();
  const handleCancel = () => navigate("/home")
  const handleSave = () => navigate("/edit2")
  return (
    <PageLayout
      title="새로운 청첩장"
      leftButton={
        <HeaderButton
          onClick={handleCancel}
          className="hover:text-pink-400 active:text-pink-600"
        >
          취소
        </HeaderButton>
      }
      rightButton={
        <HeaderButton
          onClick={handleSave}
          className="hover:text-pink-400 active:text-pink-600"
        >
          저장
        </HeaderButton>
      }
    >
      <div>
        {/* 청첩장 제목 입력 */}
        <InvitationTitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 웨딩 일시 입력 */}
        <WeddingDateInput />
      </div>
    </PageLayout>
  );
};

export default CreateInvitationPage;
