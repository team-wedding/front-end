import React from 'react';
import PageLayout from '../components/common/PageLayout';
import HeaderButton from '../components/common/HeaderButton';
import InvitationTitleInput from '../components/common/InvitationTitleInput';
import WeddingDateInput from '../components/wedding/WeddingDateInput';
import { useInvitationStore } from '../store/store';

const CreateInvitationPage: React.FC = () => {
  const { title, setTitle } = useInvitationStore();

  const handleCancel = () => console.log('취소 버튼 클릭');
  const handleSave = () => console.log('저장 버튼 클릭, 제목: ', title);

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
      <InvitationTitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <WeddingDateInput />
    </PageLayout>
  );
};

export default CreateInvitationPage;
