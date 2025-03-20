import logo from '@assets/image/wedding1.png';
import ReusableModal from '@/components/common/Modal/ReusableModal';
import { useState } from 'react';
import { useDeleteInvitation } from '@/hooks/useInvitation';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate } from 'react-router';
import CircleMinusIcon from '@/components/icons/CircleMinusIcon';
import CardFooter from '@/components/common/Card/CardFooter';

interface CardProps {
  image: string;
  id: number;
  title: string;
}

const Card = ({ image, id: invitationId, title }: CardProps) => {
  const navigate = useNavigate();

  const { mutate: deleteInvitaion } = useDeleteInvitation(invitationId);
  const { id } = useUserStore();
  const [modal, setModal] = useState(false);

  const handleDelete = async () => {
    await deleteInvitaion();
    setModal(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full rounded-xl shadow-custom">
      <div className="relative rounded-xl group transition-all duration-300 delay-100 ease-in-out hover:-translate-y-0.5 active:-translate-y-0.5">
        <button
          onClick={() => setModal(true)}
          className="absolute top-2 left-2 z-10 w-fit bg-black/10 rounded-full text-white/80"
        >
          <CircleMinusIcon />
        </button>
        <img
          src={image || logo}
          className="object-cover aspect-[3/4] rounded-xl transition-shadow duration-300 group-hover:shadow-custom"
          onClick={() => navigate(`/preview/${id}/${invitationId}`)}
        />

        <div className="absolute bottom-0 bg-black/60 w-full rounded-b-xl">
          <CardFooter
            id={invitationId}
            image={image}
            title={title}
            setModal={setModal}
          />
        </div>
      </div>

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
