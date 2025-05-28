import { useLocation, useNavigate } from 'react-router';
import { useUserStore } from '@/store/useUserStore';
import profile from '../assets/woogyeol/profile_light.png';
import profileDark from '../assets/woogyeol/profile_dark.png';
import Navbar from '@common/Navbar/Navbar';
import RsvpStatsPage from '@/pages/RsvpStatsPage';
import AdminPhotoTalkPage from '@/pages/PhotoTalk/AdminPhotoTalkPage';
import Tab from '@/components/common/Tab/Tab';
import { useEffect, useState } from 'react';
import ChevronRight from '@/components/icons/Chevron_RightIcon';
import DarkModeToggle from '@/components/common/DarkMode/DarkModeToggle';

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
    <div className="bg-surface dark:bg-surface-dark max-w-[520px]  min-h-screen m-auto">
      <header className="relative top-0 left-0 right-0 z-20 m-auto max-w-[520px] px-2 bg-surface dark:bg-surface-dark max-h-12">
        <button className="absolute top-0 right-0">
          <DarkModeToggle />
        </button>

        <section className="flex-center text-lg p-10 border-none gap-3">
          <div className="column-center">
            <img
              src={profile}
              alt="profile"
              className="w-12 block dark:hidden"
            />
            <img
              src={profileDark}
              alt="profile"
              className="w-12 hidden dark:block"
            />
          </div>

          <div className="flex flex-col text-label dark:text-label-dark text-xl font-extralight leading-6">
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
