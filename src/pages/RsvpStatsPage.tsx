import React, { useEffect, useRef, useState } from 'react';
import BackIcon from '../components/icons/BackIcon';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import RsvpItem from '../components/common/RsvpItem/RsvpItem';
import DDChevron from '../components/icons/DoubleDownChevron';

const RsvpStatsPage = () => {
  const handleBack = () => {
    console.log('전으로 돌아가기');
  };

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   })
  // }

  return (
    <PageLayout
      title="참석여부 집계 요약"
      leftButton={
        <HeaderButton onClick={handleBack}>
          <BackIcon />
        </HeaderButton>
      }
    >
      <div className='bg-red-100 h-full pb-6'>
        <div className='relative px-4 pt-2 pb-12'>
          <RsvpItem title={'총 응답 수'} attend={0} total={true} />
          <section className='grid grid-cols-2 gap-2 mt-2' >
            <RsvpItem title={'참석 가능'} attend={0} />
            <RsvpItem title={'참석 불가'} attend={0} />
            <RsvpItem title={'신랑측'} description='(참석 가능 / 불가)' attend={0} unattend={100} bride={false} />
            <RsvpItem title={'신부측'} description='(참석 가능 / 불가)' attend={0} unattend={100} bride={true} />
            <RsvpItem title={'식사 가능'} attend={10} />
            <RsvpItem title={'식사 불가'} attend={3} />
          </section>
        </div>
        <div>상세정보 </div>
        <section className='flex flex-col gap-2 px-3  h-96 overflow-y-scroll' >
          <div className='flex flex-col gap-1 bg-white p-3 rounded-xl border-2 border-solid border-pink-500'>
            <div className=''>누구누구 님 외 2명</div>
            <div className='flex flex-row justify-between'>
              <div>연락처</div>
              <div>000-0000-0000</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>식사여부</div>
              <div>가능</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 bg-white p-3 rounded-xl border-2 border-solid border-pink-500'>
            <div className=''>누구누구 님 외 2명</div>
            <div className='flex flex-row justify-between'>
              <div>연락처</div>
              <div>000-0000-0000</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>식사여부</div>
              <div>가능</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 bg-white p-3 rounded-xl border-2 border-solid border-pink-500'>
            <div className=''>누구누구 님 외 2명</div>
            <div className='flex flex-row justify-between'>
              <div>연락처</div>
              <div>000-0000-0000</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>식사여부</div>
              <div>가능</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 bg-white p-3 rounded-xl border-2 border-solid border-pink-500'>
            <div className=''>누구누구 님 외 2명</div>
            <div className='flex flex-row justify-between'>
              <div>연락처</div>
              <div>000-0000-0000</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>식사여부</div>
              <div>가능</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 bg-white p-3 rounded-xl border-2 border-solid border-pink-500'>
            <div className=''>누구누구 님 외 2명</div>
            <div className='flex flex-row justify-between'>
              <div>연락처</div>
              <div>000-0000-0000</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>식사여부</div>
              <div>가능</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 bg-white p-3 rounded-xl border-2 border-solid border-pink-500'>
            <div className=''>누구누구 님 외 2명</div>
            <div className='flex flex-row justify-between'>
              <div>연락처</div>
              <div>000-0000-0000</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>식사여부</div>
              <div>가능</div>
            </div>
          </div>
          <div className='flex flex-col gap-1 bg-white p-3 rounded-xl border-2 border-solid border-pink-500'>
            <div className=''>누구누구 님 외 2명</div>
            <div className='flex flex-row justify-between'>
              <div>연락처</div>
              <div>000-0000-0000</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>식사여부</div>
              <div>가능</div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default RsvpStatsPage;
