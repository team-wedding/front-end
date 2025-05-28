import logo from '@assets/image/wedding1.png';
import ReusableModal from '@/components/common/Modal/ReusableModal';
import { useState } from 'react';
import { useDeleteInvitation } from '@/hooks/useInvitation';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router';
import CircleMinusIcon from '@/components/icons/CircleMinusIcon';
import CardFooter from '@/components/common/Card/CardFooter';
import { useS3RemoveImage } from '@/hooks/useS3Image';

interface CardProps {
  image: string;
  id: number;
  title: string;
}

const Card = ({ image, id: invitationId, title }: CardProps) => {
  const navigate = useNavigate();

  const { mutate: deleteInvitation } = useDeleteInvitation(invitationId);
  const { mutate: deleteS3Invitation } = useS3RemoveImage(
    invitationId.toString(),
  );
  const { id: userId } = useUserStore();

  const [modal, setModal] = useState(false);

  const handleDelete = async () => {
    await deleteInvitation();
    await deleteS3Invitation();
    setModal(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full rounded-xl shadow-md hover:shadow-custom">
      <section className="relative rounded-xl group transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:-translate-y-0.5">
        <header>
          <button
            onClick={() => setModal(true)}
            aria-label="삭제하기"
            className="absolute top-1.5 left-1.5 z-10 w-fit p-1 bg-surface-overlay/60 rounded-full text-icon-card hover:bg-surface-muted/60"
          >
            <CircleMinusIcon />
          </button>
        </header>

        <img
          src={image || logo}
          className="object-cover aspect-[3/4] rounded-xl"
          onClick={() => navigate(`/preview/${userId}/${invitationId}`)}
        />

        <CardFooter
          id={invitationId}
          image={image}
          title={title}
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

export default Card;
