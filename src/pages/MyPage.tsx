import PageLayout from '@layout/PageLayout';
import logo from '../assets/logo3.png';
import piechart from '../assets/piechart.svg';
import phototalk from '../assets/phototalk.svg';
import MyPageItem from '@common/MyPage/MyPageItem';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router';

const MyPage = () => {
  const { name } = useUserStore();
  const navigate = useNavigate();

  return (
    <PageLayout title="우리, 결혼해요">
      <section className="flex flex-row justify-around items-center font-medium text-3xl p-8 border-b shadow-inner bg-gray-50">
        <div className="flex flex-col gap-2 text-neutral-400">
          <div>안녕하세요</div>
          <div className="text-black flex flex-row gap-2">
            {name}님{' '}
            <div
              className="animate-bounceX cursor-pointer"
              onClick={() => navigate('/mypage/edit')}
            >
              {' > '}
            </div>
          </div>
        </div>
        <img src={logo} alt="logo" className="w-20" />
      </section>
      {/* <hr className="flex bg-gray-50 h-2" /> */}
      <section className="flex flex-col px-8 gap-5 my-8">
        <MyPageItem
          icon={piechart}
          title={'참석여부 집계요약'}
          detail={'하객의 응답과 상세 목록을 확인할 수 있습니다.'}
          href="/mypage/rsvp"
        />
        <MyPageItem
          icon={phototalk}
          title={'포토톡'}
          detail={'이미지와 축하메시지를 볼 수 있습니다.'}
          href="/mypage/phototalk" // 수정해야 함.
        />
      </section>
    </PageLayout>
  );
};

export default MyPage;
