// import BackIcon from '@icons/BackIcon';
import PageLayout from '@layout/PageLayout';
// import HeaderButton from '@common/Header/HeaderButton';
import logo from '../assets/logo_icon.svg';
import MyPageItem from '@common/MyPage/MyPageItem';

const MyPage = () => {
  // const handleBack = () => {
  //   console.log('전으로 돌아가기');
  // };

  return (
    <PageLayout
      title='우리, 결혼해요'
    >
      <section className="flex flex-row justify-around items-center font-medium text-4xl p-8 cursor-pointer">
        <div className="flex flex-col gap-1 text-gray-400">
          안녕하세요
          <div className="text-black flex flex-row gap-2">
            ㅇㅇㅇ 님 <div className="animate-bounceX">{' > '}</div>
          </div>
        </div>
        <img src={logo} alt="logo" />
      </section>
      <hr className="flex w-5/6 justify-self-center bg-black h-px" />
      <section className="flex flex-col px-8 gap-10 mt-10">
        <MyPageItem
          icon={logo}
          title={'참석여부 집계요약'}
          detail={'RSVP , 방명록 등을 볼 수 있어요'}
          href='/mypage/rsvp'
        />
        <MyPageItem
          icon={logo}
          title={'포토톡'}
          detail={'RSVP , 방명록 등을 볼 수 있어요'}
          href='/mypage/rsvp' // 수정해야 함.
        />
      </section>
    </PageLayout>
  );
};

export default MyPage;
