import React from 'react';
import BackIcon from '../components/icons/BackIcon';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import MyPageItems from '../components/common/MyPage/myPageItems';
import logo from '../assets/logo_icon.svg'

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
      <section className='flex flex-row justify-around items-center font-semibold text-4xl p-8 cursor-pointer '>
        <div className='flex flex-col gap-1 text-gray-500'>안녕하세요
          <div className='text-black flex flex-row gap-2' >ㅇㅇㅇ 님 <div className='animate-bounceX'>{' > '}</div></div>
        </div>
        <img src={logo} alt="logo" />
      </section>
      <hr className='flex w-5/6 justify-self-center bg-black h-px' />
      <section className='flex flex-col px-8 gap-10 mt-10'>
        <MyPageItems icon={logo} title={'참석여부 집계요약'} detail={'RSVP , 방면록등을 볼수있어요'} />
        <MyPageItems icon={logo} title={'포토톡'} detail={'RSVP , 방면록등을 볼수있어요'} />
      </section>
    </PageLayout>
  );
};

export default EditMyPage;
