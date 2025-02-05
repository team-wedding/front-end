import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import logo from '@assets/image/wedding1.png';
import ReusableModal from '@/components/common/Modal/ReusableModal';
import { useState } from 'react';
import { useDeleteInvitation } from '@/hooks/useInvitation';
import { useUserStore } from '@/store/useUserStore';

interface CardProps {
  image: string;
  id: number;
  title: string;
}

const Card = ({ image, id: invitationId, title }: CardProps) => {
  const { mutate: deleteInvitaion } = useDeleteInvitation(invitationId);
  const { id } = useUserStore();
  const handleDelete = async () => {
    await deleteInvitaion();
    setModal(false)
  };
  const [modal, setModal] = useState(false)
  return (
    <div className="relative flex flex-col items-center rounded-lg w-[152px] bg-gray-100 shadow-lg">
      <CardHeader id={invitationId} image={image} title={title} setModal={setModal} />
      <div className="w-full border-l border-r">
        <img
          src={image || logo}
          className='object-cover h-[170px] w-[152px]'
        />
      </div>
      <CardFooter id={invitationId} userId={id} />
      <ReusableModal isOpen={modal} title={`"${title}" 청첩장을 삭제하시겠습니까? `} confirmText={'삭제'} onConfirm={handleDelete} onCancel={() => setModal(false)} />
    </div>
  );
};

export default Card;
