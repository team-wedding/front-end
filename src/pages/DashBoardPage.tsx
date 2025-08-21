import Card from '@common/Card/Card';
import { InvitationDetail } from '../types/invitationTypes';
import { useEffect, useState } from 'react';
import { useGetInvitations } from '@/hooks/useInvitation';
import Navbar from '@common/Navbar/Navbar';
import Logo from '@common/Logo';
import DarkModeToggle from '@/components/common/DarkMode/DarkModeToggle';
import SkeletonCard from '@/components/common/Skeleton/SkeletonCard';
import InputTitleModal from '@/components/common/Modal/InputTitleModal';

const DashBoardPage = () => {
  const { data, isPending, isRefetching, status, isError, isFetching } =
    useGetInvitations();
  const [invitations, setInvitations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen((prev) => !prev);

  useEffect(() => {
    if (data) {
      setInvitations(data);
    }
  }, [data, status, isFetching]);

  if (isError) {
    return <>something went wrong</>;
  }

  return (
    <div className="bg-surface dark:bg-surface-dark max-w-[520px]  min-h-screen m-auto">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-20 m-auto max-w-[520px] bg-surface dark:bg-surface-dark flex justify-start items-center max-h-12">
        <div className="p-3">
          <Logo className="w-6" />
        </div>
        <div className="absolute top-0 right-0">
          <DarkModeToggle />
        </div>
      </header>

      <main className="min-h-screen flex flex-col">
        <div className="h-12"></div>

        <div className="min-h-screen px-3 pb-40 flex-1">
          <div className="h-full flex-between">
            <div className="text-sm font-light py-3 text-label dark:text-label-dark">
              나의 청첩장 목록
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 place-items-center">
            {isPending || isRefetching
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : invitations.map((card: InvitationDetail) => (
                  <Card
                    key={card.id}
                    image={card.imgUrl}
                    data-testid="invitation-card"
                    id={card.id as number}
                    createdAt={card.createdAt}
                    title={card.title}
                  />
                ))}
          </div>

          {!isPending && !isRefetching && invitations.length === 0 && (
            <div className="column-center gap-4 w-4/5 m-auto h-60 rounded-2xl bg-surface-muted dark:bg-surface-muted-dark text-label-secondary/60 dark:text-label-secondary-dark/60 mt-4">
              <span className="text-md">아직 저장된 청첩장이 없어요.</span>
              <button
                className="w-[8rem] p-2 text-md bg-surface-button text-label-button/60 rounded-3xl trasition-all duration-200 dark:bg-white/60 hover:bg-black/10 dark:hover:bg-white/20"
                onClick={handleModal}
              >
                청첩장 만들기
              </button>
            </div>
          )}

          <div className="absolute top-0">
            {isModalOpen && <InputTitleModal onClose={handleModal} />}
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default DashBoardPage;
