import React from 'react';
import BackIcon from '../components/icons/BackIcon';
import PageLayout from '../components/common/PageLayout';
import HeaderButton from '../components/common/HeaderButton';

const EditMyPage = () => {
  const handleBack = () => {
    console.log('전으로 돌아가기');
  };

  return (
    <PageLayout
      title="내 정보 수정"
      leftButton={
        <HeaderButton onClick={handleBack}>
          <BackIcon />
        </HeaderButton>
      }
    >
      <p>내 정보 수정 페이지</p>
    </PageLayout>
  );
};

export default EditMyPage;
