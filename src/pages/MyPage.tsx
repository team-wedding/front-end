import { useLocation, useNavigate } from 'react-router';
import { useUserStore } from '@/store/useUserStore';
import profile from '../assets/woogyeol/profile_light.png';
import MoonIcon from '@/components/icons/MoonIcon';
import Navbar from '@/components/common/Navbar/Navbar';
import RsvpStatsPage from '@/pages/RsvpStatsPage';
import AdminPhotoTalkPage from '@/pages/PhotoTalk/AdminPhotoTalkPage';
import Tab from '@/components/common/Tab/Tab';
import { useEffect, useState } from 'react';
import ChevronRight from '@/components/icons/Chevron_RightIcon';

const TabData = [
  {
    label: 'RSVP',
    content: <RsvpStatsPage />,
    href: '/mypage/rsvp',
  },
  {
    label: '포토톡',
    content: <AdminPhotoTalkPage />,
    href: '/mypage/phototalk',
  },
];

const MyPage = () => {
  const { name } = useUserStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const currentTabIndex = TabData.findIndex((tab) =>
      location.pathname.startsWith(tab.href),
    );
    if (currentTabIndex !== -1) {
      setActiveTab(currentTabIndex);
    }
  }, [location.pathname]);

  return (
    <div className="bg-white max-w-[520px]  min-h-screen m-auto">
      <header className="relative top-0 left-0 right-0 z-20 m-auto max-w-[520px] px-2 bg-white max-h-12">
        <button className="p-3 absolute top-0 right-0">
          <MoonIcon />
        </button>

        <section className="flex-center text-lg p-6 border-none gap-3">
          <div className="column-center">
            <img src={profile} alt="profile" className="w-20" />
            {/* <button
              className="text-xs text-[#B4B4B4] font-extralight"
              onClick={() => navigate('/mypage/edit')}
            >
              프로필 수정
            </button> */}
          </div>

          <div className="flex flex-col text-lg font-extralight leading-6 text-black/90">
            <div>안녕하세요,</div>
            <div className="flex-center">
              <div className="font-medium">{name || '김우결'}</div>
              <div>님</div>
              <div
                className="animate-pulse cursor-pointer font-medium"
                onClick={() => navigate('/mypage/edit')}
              >
                <ChevronRight />
              </div>
            </div>
          </div>
        </section>
      </header>

      <main className="flex flex-col flex-1">
        <div className="h-20"></div>

        <Tab
          data={TabData}
          activeTab={activeTab}
          setActiveTab={(index) => {
            setActiveTab(index);
            navigate(TabData[index].href);
          }}
        />
      </main>

      <Navbar />
    </div>
  );
};

export default MyPage;
