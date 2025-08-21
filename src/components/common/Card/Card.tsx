import logo from '@assets/image/wedding1.png';
import ReusableModal from '@/components/common/Modal/ReusableModal';
import React, { useState } from 'react';
import { useDeleteInvitation } from '@/hooks/useInvitation';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router';
import CircleMinusIcon from '@/components/icons/CircleMinusIcon';
import CardFooter from '@/components/common/Card/CardFooter';
import { useDeleteInvitationS3Url } from '@/hooks/useS3Image';

interface CardProps {
  image: string;
  id: number;
  title: string;
  createdAt: string;
}

const Card = ({ image, id: invitationId, title, createdAt }: CardProps) => {
  const navigate = useNavigate();
  const { id: userId } = useUserStore();
  const [modal, setModal] = useState(false);

  const previewUrl = `/preview/${userId}/${invitationId}`;

  const { mutate: deleteInvitation } = useDeleteInvitation(invitationId);
  const { mutate: deleteS3Invitation } = useDeleteInvitationS3Url(
    invitationId.toString(),
  );

  const handleDelete = async () => {
    await deleteInvitation();
    await deleteS3Invitation();
    setModal(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-cente w-full rounded-xl shadow-md hover:shadow-custom">
      <section className="relative rounded-xl group transition-all duration-300 ease-in-out active:-translate-y-0.5">
        <header>
          <button
            onClick={() => setModal(true)}
            aria-label="삭제하기"
            className="absolute top-2 left-2 z-10 p-[2px] bg-surface-overlay/30 rounded-full text-icon-card/80 hover:bg-surface-muted/20"
          >
            <CircleMinusIcon />
          </button>
        </header>

        <img
          src={image || logo}
          className="object-cover aspect-[3/4] rounded-xl w-full h-full group-hover:brightness-75 transition-all duration-300 ease-in-out"
          onClick={() => navigate(previewUrl)}
        />

        <CardFooter
          id={invitationId}
          image={image}
          title={title}
          createdAt={createdAt}
          setModal={setModal}
        />
      </section>

      <ReusableModal
        isOpen={modal}
        title={`"${title}" 청첩장을 삭제하시겠습니까? `}
        confirmText={'삭제'}
        onConfirm={handleDelete}
        onCancel={() => setModal(false)}
      />
    </div>
  );
};

export default React.memo(Card);
