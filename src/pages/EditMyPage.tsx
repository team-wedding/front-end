import React from 'react';
import BackIcon from '../components/icons/BackIcon';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import { useUserStore } from '../store/useUserStore';

const EditMyPage = () => {
  const handleBack = () => {
    console.log('전으로 돌아가기');
  };
  const { setToken } = useUserStore()
  const clearStorage = useUserStore.persist.clearStorage
  const handleLogout = () => {
    setToken("")
    clearStorage()
  }
  return (
    <PageLayout
      title="내 정보 수정"
      leftButton={
        <HeaderButton onClick={handleBack}>
          <BackIcon />
        </HeaderButton>
      }
      rightButton={
        <HeaderButton onClick={handleLogout}>
          <div>로그아웃</div>
        </HeaderButton>
      }
    >
      <p>내 정보 수정 페이지</p>
    </PageLayout>
  );
};

export default EditMyPage;
